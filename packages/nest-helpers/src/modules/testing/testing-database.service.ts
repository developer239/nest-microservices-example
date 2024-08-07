import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm/data-source/DataSource'

@Injectable()
export class TestingDatabaseService {
  constructor(@InjectDataSource() public dataSource: DataSource) {}

  public async clearDb() {
    const entities = this.dataSource.entityMetadatas

    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name)
      // TODO: fix
      // eslint-disable-next-line no-await-in-loop
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE`
      )
    }
  }
}
