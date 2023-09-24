import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1695480516100 implements MigrationInterface {
    name = 'InitialMigration1695480516100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "complaintcategorys" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "class" integer NOT NULL, CONSTRAINT "UQ_d0fe28d43f4c1e39fac4cc07e26" UNIQUE ("name"), CONSTRAINT "PK_3e079754ee52e1b56a71b83ca8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personals" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "full_name" character varying, "avatar_file_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "UQ_e1d66ab0046e8fbaf7029a9cd06" UNIQUE ("email"), CONSTRAINT "REL_74971e6a879d4f0bad4610dce4" UNIQUE ("userId"), CONSTRAINT "PK_09831f55782035aea9d9825befe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meters" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "address" character varying NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "ownById" integer, CONSTRAINT "UQ_ef9b6e9d93abaf279a0b71e0432" UNIQUE ("code"), CONSTRAINT "PK_0a71b52dbb545fa36efaf070583" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complaints" ("id" SERIAL NOT NULL, "desc" character varying NOT NULL, "status" character varying NOT NULL, "Image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "complaintCatIsId" integer, "meteranId" integer, CONSTRAINT "PK_4b7566a2a489c2cc7c12ed076ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "UQ_396d500ff7f1b82771ddd812fd1" UNIQUE ("name"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complainthandlings" ("id" SERIAL NOT NULL, "notes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "complaintOwnById" integer, "taskOwnById" integer, "handlingById" integer, CONSTRAINT "REL_95f3b951dbe4e59ae41e27d64e" UNIQUE ("complaintOwnById"), CONSTRAINT "PK_99f2128226355ea3020153f6036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complaintimages" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "is_primary" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4e3e9bcf0a48c0ca3b0a55f1c19" UNIQUE ("file_name"), CONSTRAINT "PK_ea6c79478eecec2b526de04a3a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personals" ADD CONSTRAINT "FK_74971e6a879d4f0bad4610dce47" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meters" ADD CONSTRAINT "FK_971d53fc935ec984e3868ad3d58" FOREIGN KEY ("ownById") REFERENCES "personals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaints" ADD CONSTRAINT "FK_e8d08b05de09f1e8537893af589" FOREIGN KEY ("complaintCatIsId") REFERENCES "complaintcategorys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaints" ADD CONSTRAINT "FK_cf5a64f77cffdb2f488db393d5e" FOREIGN KEY ("meteranId") REFERENCES "meters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complainthandlings" ADD CONSTRAINT "FK_95f3b951dbe4e59ae41e27d64eb" FOREIGN KEY ("complaintOwnById") REFERENCES "complaints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complainthandlings" ADD CONSTRAINT "FK_d8047b8d31bc43d1e5e42c251e4" FOREIGN KEY ("taskOwnById") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complainthandlings" ADD CONSTRAINT "FK_fadbed4f7b661befb509ad2ce86" FOREIGN KEY ("handlingById") REFERENCES "personals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complainthandlings" DROP CONSTRAINT "FK_fadbed4f7b661befb509ad2ce86"`);
        await queryRunner.query(`ALTER TABLE "complainthandlings" DROP CONSTRAINT "FK_d8047b8d31bc43d1e5e42c251e4"`);
        await queryRunner.query(`ALTER TABLE "complainthandlings" DROP CONSTRAINT "FK_95f3b951dbe4e59ae41e27d64eb"`);
        await queryRunner.query(`ALTER TABLE "complaints" DROP CONSTRAINT "FK_cf5a64f77cffdb2f488db393d5e"`);
        await queryRunner.query(`ALTER TABLE "complaints" DROP CONSTRAINT "FK_e8d08b05de09f1e8537893af589"`);
        await queryRunner.query(`ALTER TABLE "meters" DROP CONSTRAINT "FK_971d53fc935ec984e3868ad3d58"`);
        await queryRunner.query(`ALTER TABLE "personals" DROP CONSTRAINT "FK_74971e6a879d4f0bad4610dce47"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "complaintimages"`);
        await queryRunner.query(`DROP TABLE "complainthandlings"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "complaints"`);
        await queryRunner.query(`DROP TABLE "meters"`);
        await queryRunner.query(`DROP TABLE "personals"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "complaintcategorys"`);
    }

}
