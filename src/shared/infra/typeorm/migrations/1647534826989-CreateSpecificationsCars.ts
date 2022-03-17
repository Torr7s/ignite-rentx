import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableForeignKeyOptions } from 'typeorm';

export class CreateSpecificationsCars1647534826989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid'
          },
          {
            name: 'specification_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    const carForeignKey: TableForeignKeyOptions = {
      name: 'FKCarSpecification',
      referencedTableName: 'cars',
      referencedColumnNames: ['id'],
      columnNames: ['car_id'],
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }

    const specForeignKey: TableForeignKeyOptions = {
      name: 'FKSpecificationCar',
      referencedTableName: 'specifications',
      referencedColumnNames: ['id'],
      columnNames: ['specification_id'],
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }

    await queryRunner.createForeignKey('specifications_cars', new TableForeignKey(carForeignKey))
    await queryRunner.createForeignKey('specifications_cars', new TableForeignKey(specForeignKey))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification')
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar')

    await queryRunner.dropTable('specifications_car')
  }
}
