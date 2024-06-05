import { EventSeedService } from 'src/modules/database/seeds/event/event-seed.service'
import { runSeed, SeedModule } from 'backend-shared'
import { EventSeedModule } from 'src/modules/database/seeds/event/event-seed.module'

void runSeed(
  SeedModule.forRoot(__dirname, {
    imports: [EventSeedModule],
  }),
  [EventSeedService]
)