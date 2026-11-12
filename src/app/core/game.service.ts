import { computed, DestroyRef, Injectable, signal } from '@angular/core';

export type UpgradeId = 'ronaldo' | 'messi' | 'mbappe' | 'haaland' | 'neymar';
export type BossId = 'maradona' | 'ronaldinho' | 'zidane' | 'pele';
export type TabId = 'shop' | 'collection';
export interface UpgradeDefinition {
  id: UpgradeId;
  name: string;
  subtitle: string;
  emoji: string;
  baseCost: number;
  scale: number;
  description: string;
  kind: 'click' | 'auto' | 'critical';
  rarity: string;
}
export interface BossDefinition {
  id: BossId;
  name: string;
  title: string;
  emoji: string;
  perk: string;
  accent: string;
}
export interface ActiveBoss {
  id: BossId;
  hp: number;
  maxHp: number;
  remaining: number;
  reward: number;
}
interface SaveData {
  version: number;
  goals: number;
  lifetime: number;
  clicks: number;
  upgrades: Record<UpgradeId, number>;
  boots: BossId[];
  wins: number;
  losses: number;
  lastSaved: number;
}
export const UPGRADES: readonly UpgradeDefinition[] = [
  { id: 'ronaldo', name: 'Botas de Cristiano', subtitle: 'El rematador', emoji: '🥇', baseCost: 25, scale: 1.75, description: 'Duplica la potencia base de cada disparo por nivel.', kind: 'click', rarity: 'ÉPICA' },
  { id: 'messi', name: 'Botas de Messi', subtitle: 'La magia del 10', emoji: '✨', baseCost: 40, scale: 1.7, description: '+1 gol cada 2 segundos por nivel.', kind: 'auto', rarity: 'LEGENDARIA' },
  { id: 'mbappe', name: 'Botas de Mbappé', subtitle: 'Velocidad absoluta', emoji: '⚡', baseCost: 75, scale: 1.6, description: '+3 goles de potencia base por nivel.', kind: 'click', rarity: 'ÉPICA' },
  { id: 'haaland', name: 'Botas de Haaland', subtitle: 'La máquina de goles', emoji: '🔥', baseCost: 150, scale: 1.85, description: '+3 goles automáticos por segundo y nivel.', kind: 'auto', rarity: 'LEGENDARIA' },
  { id: 'neymar', name: 'Botas de Neymar', subtitle: 'Toque brasileño', emoji: '💎', baseCost: 280, scale: 1.95, description: '+5% de probabilidad de crítico por nivel (máx. 50%).', kind: 'critical', rarity: 'MÍTICA' },
];
export const BOSSES: readonly BossDefinition[] = [
  { id: 'maradona', name: 'Maradona', title: 'La mano de Dios', emoji: '👑', perk: '+5 goles por disparo', accent: '#6bbaf3' },
  { id: 'ronaldinho', name: 'Ronaldinho', title: 'El mago del balón', emoji: '🪄', perk: 'x1,5 goles por disparo', accent: '#e9ad54' },
  { id: 'zidane', name: 'Zidane', title: 'El maestro', emoji: '🎩', perk: '+8 goles por segundo', accent: '#bfa6f4' },
  { id: 'pele', name: 'Pelé', title: 'El rey del fútbol', emoji: '🏆', perk: 'x2 goles por disparo', accent: '#ffe083' },
];
const KEY = 'goal-rush-save-v1';
const INITIAL: SaveData = { version: 1, goals: 0, lifetime: 0, clicks: 0, upgrades: { ronaldo: 0, messi: 0, mbappe: 0, haaland: 0, neymar: 0 }, boots: [], wins: 0, losses: 0, lastSaved: Date.now() };

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly state = signal<SaveData>(this.load());
  readonly goals = computed(() => this.state().goals);
  readonly lifetime = computed(() => this.state().lifetime);
  readonly clicks = computed(() => this.state().clicks);
  readonly wins = computed(() => this.state().wins);
  readonly losses = computed(() => this.state().losses);
  readonly upgrades = computed(() => this.state().upgrades);
  readonly boots = computed(() => this.state().boots);
  readonly activeBoss = signal<ActiveBoss | null>(null);
  readonly nextBossIn = signal(60);
  readonly notice = signal('¡Bienvenido al estadio! Marca tu primer gol.');
  readonly lastShot = signal<{ amount: number; critical: boolean; id: number } | null>(null);
  readonly clickPower = computed(() => {
    const s = this.state();
    let base = (1 + s.upgrades.mbappe * 3 + (s.boots.includes('maradona') ? 5 : 0)) * 2 ** s.upgrades.ronaldo;
    if (s.boots.includes('ronaldinho')) base *= 1.5;
    if (s.boots.includes('pele')) base *= 2;
    return Math.max(1, Math.floor(base));
  });
  readonly autoPerSecond = computed(() => {
    const s = this.state();
    return s.upgrades.messi / 2 + s.upgrades.haaland * 3 + (s.boots.includes('zidane') ? 8 : 0);
  });
  readonly criticalChance = computed(() => Math.min(0.5, this.state().upgrades.neymar * 0.05));
  readonly bossProgress = computed(() => {
    const boss = this.activeBoss();
    return boss ? Math.max(0, Math.min(100, (boss.hp / boss.maxHp) * 100)) : 0;
  });
  readonly collectedCount = computed(() => this.state().boots.length);
  private tickId: ReturnType<typeof setInterval> | undefined;
  private seconds = 0;
  private shotIndex = 0;
  private bossIndex = 0;
  private autoRemainder = 0;

  constructor(destroyRef: DestroyRef) {
    this.tickId = setInterval(() => this.tick(), 1000);
    destroyRef.onDestroy(() => { if (this.tickId) clearInterval(this.tickId); this.save(); });
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibility);
      destroyRef.onDestroy(() => document.removeEventListener('visibilitychange', this.onVisibility));
    }
  }

  private onVisibility = (): void => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') this.save();
  };

  private load(): SaveData {
    if (typeof localStorage === 'undefined') return { ...INITIAL, upgrades: { ...INITIAL.upgrades } };
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...INITIAL, upgrades: { ...INITIAL.upgrades } };
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      if (parsed.version !== 1 || !parsed.upgrades) return { ...INITIAL, upgrades: { ...INITIAL.upgrades } };
      const clean: SaveData = {
        version: 1, goals: this.safeNumber(parsed.goals), lifetime: this.safeNumber(parsed.lifetime),
        clicks: this.safeNumber(parsed.clicks), wins: this.safeNumber(parsed.wins), losses: this.safeNumber(parsed.losses),
        upgrades: {
          ronaldo: this.safeNumber(parsed.upgrades.ronaldo), messi: this.safeNumber(parsed.upgrades.messi),
          mbappe: this.safeNumber(parsed.upgrades.mbappe), haaland: this.safeNumber(parsed.upgrades.haaland),
          neymar: this.safeNumber(parsed.upgrades.neymar)
        },
        boots: Array.isArray(parsed.boots) ? [...new Set(parsed.boots.filter((x): x is BossId => BOSSES.some(b => b.id === x)))] : [],
        lastSaved: this.safeNumber(parsed.lastSaved) || Date.now()
      };
      const elapsed = Math.min(7200, Math.max(0, Math.floor((Date.now() - clean.lastSaved) / 1000)));
      const passive = Math.floor(elapsed * (clean.upgrades.messi / 2 + clean.upgrades.haaland * 3 + (clean.boots.includes('zidane') ? 8 : 0)));
      clean.goals += passive;
      clean.lifetime += passive;
      return clean;
    } catch { return { ...INITIAL, upgrades: { ...INITIAL.upgrades } }; }
  }

  private safeNumber(n: unknown): number {
    return typeof n === 'number' && Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  }

  private patch(update: Partial<SaveData>): void { this.state.update(s => ({ ...s, ...update })); }
  private credit(amount: number): void {
    const n = Math.floor(amount);
    if (!Number.isFinite(n) || n <= 0) return;
    this.state.update(s => ({ ...s, goals: s.goals + n, lifetime: s.lifetime + n }));
  }

  shoot(): void {
    const critical = Math.random() < this.criticalChance();
    const amount = this.clickPower() * (critical ? 3 : 1);
    this.credit(amount);
    this.state.update(s => ({ ...s, clicks: s.clicks + 1 }));
    this.lastShot.set({ amount, critical, id: ++this.shotIndex });
    const boss = this.activeBoss();
    if (boss) {
      const hp = Math.max(0, boss.hp - amount);
      this.activeBoss.set({ ...boss, hp });
      if (hp === 0) this.winBoss(boss);
    }
  }

  level(id: UpgradeId): number { return this.state().upgrades[id]; }
  cost(item: UpgradeDefinition): number { return Math.ceil(item.baseCost * item.scale ** this.level(item.id)); }
  canBuy(item: UpgradeDefinition): boolean { return this.goals() >= this.cost(item) && this.level(item.id) < 30; }
  buy(item: UpgradeDefinition): boolean {
    const cost = this.cost(item);
    if (!this.canBuy(item)) return false;
    this.state.update(s => ({ ...s, goals: s.goals - cost, upgrades: { ...s.upgrades, [item.id]: s.upgrades[item.id] + 1 } }));
    this.notice.set(`¡${item.name} mejoradas a nivel ${this.level(item.id)}!`);
    this.save();
    return true;
  }

  private tick(): void {
    this.seconds++;
    this.autoRemainder += this.autoPerSecond();
    const passive = Math.floor(this.autoRemainder);
    if (passive > 0) { this.credit(passive); this.autoRemainder -= passive; }
    const boss = this.activeBoss();
    if (boss) {
      if (boss.remaining <= 1) this.loseBoss();
      else this.activeBoss.set({ ...boss, remaining: boss.remaining - 1 });
    } else if (this.nextBossIn() <= 1) this.spawnBoss();
    else this.nextBossIn.update(n => n - 1);
    if (this.seconds % 5 === 0) this.save();
  }
  private spawnBoss(): void {
    const definition = BOSSES[this.bossIndex % BOSSES.length];
    this.bossIndex++;
    const tier = this.wins() + this.losses();
    const maxHp = Math.floor(75 * 1.65 ** Math.min(tier, 25));
    const reward = Math.floor(150 * 1.75 ** Math.min(tier, 25));
    this.activeBoss.set({ id: definition.id, maxHp, hp: maxHp, remaining: 35, reward });
    this.notice.set(`¡${definition.name} te desafía! ¡Tienes 35 segundos!`);
  }
  private winBoss(boss: ActiveBoss): void {
    const owned = this.state().boots;
    const newBoot = !owned.includes(boss.id);
    this.patch({ wins: this.wins() + 1, boots: newBoot ? [...owned, boss.id] : owned });
    this.credit(boss.reward);
    this.activeBoss.set(null);
    this.nextBossIn.set(75);
    const name = BOSSES.find(b => b.id === boss.id)?.name ?? 'jefe';
    this.notice.set(`¡VICTORIA ante ${name}! +${boss.reward} goles${newBoot ? ' y botas exclusivas desbloqueadas' : ''}.`);
    this.save();
  }
  private loseBoss(): void {
    this.patch({ losses: this.losses() + 1 });
    this.activeBoss.set(null);
    this.nextBossIn.set(50);
    this.notice.set('Se acabó el tiempo. ¡El próximo rival será tu revancha!');
    this.save();
  }
  save(): void {
    if (typeof localStorage === 'undefined') return;
    try { localStorage.setItem(KEY, JSON.stringify({ ...this.state(), lastSaved: Date.now() } satisfies SaveData)); }
    catch { /* El juego sigue funcionando si el almacenamiento está bloqueado. */ }
  }
  reset(): void {
    this.state.set({ ...INITIAL, upgrades: { ...INITIAL.upgrades }, lastSaved: Date.now() });
    this.activeBoss.set(null); this.nextBossIn.set(60); this.autoRemainder = 0; this.bossIndex = 0;
    this.notice.set('Partida reiniciada. ¡A por el primer gol!');
    this.save();
  }
}
