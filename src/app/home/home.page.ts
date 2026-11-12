import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular';
import { BOSSES, GameService, UPGRADES, UpgradeDefinition, TabId } from '../core/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  readonly game = inject(GameService);
  readonly upgrades = UPGRADES;
  readonly bosses = BOSSES;
  readonly activeTab = signal<TabId>('shop');
  readonly shopOpen = signal(false);
  readonly showReset = signal(false);
  readonly bossDetails = computed(() => BOSSES.find(b => b.id === this.game.activeBoss()?.id));
  readonly playerLevel = computed(() => Math.max(1, Math.floor(Math.log2(this.game.lifetime() / 100 + 1)) + 1));
  readonly nextLevelPercent = computed(() => {
    const total = this.game.lifetime();
    const lvl = this.playerLevel();
    const lower = (2 ** (lvl - 1) - 1) * 100;
    const upper = (2 ** lvl - 1) * 100;
    return Math.max(0, Math.min(100, (total - lower) / (upper - lower) * 100));
  });

  shoot(): void { this.game.shoot(); }
  toggleShop(): void { this.shopOpen.update(v => !v); }
  setTab(tab: TabId): void { this.activeTab.set(tab); this.shopOpen.set(true); }
  buy(item: UpgradeDefinition): void { this.game.buy(item); }
  format(value: number): string {
    if (value < 1000) return Math.floor(value).toLocaleString('es-ES');
    const units = [{ n: 1e12, t: 'B' }, { n: 1e9, t: 'MM' }, { n: 1e6, t: 'M' }, { n: 1e3, t: 'K' }];
    const u = units.find(u => value >= u.n)!;
    return `${(value / u.n).toLocaleString('es-ES', { maximumFractionDigits: 1 })}${u.t}`;
  }
  confirmReset(): void { this.game.reset(); this.showReset.set(false); this.shopOpen.set(false); }
}
