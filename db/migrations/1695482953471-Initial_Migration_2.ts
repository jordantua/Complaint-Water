import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration21695482953471 implements MigrationInterface {
    name = 'InitialMigration21695482953471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complaints" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "complaints" ADD "status" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complaints" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "complaints" ADD "status" character varying NOT NULL`);
    }

}
