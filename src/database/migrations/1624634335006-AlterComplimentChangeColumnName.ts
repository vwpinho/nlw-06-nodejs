import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterComplimentChangeColumnName1624634335006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compliments" RENAME COLUMN "create_at" TO "created_at";`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compliments" RENAME COLUMN "created_at" TO "create_at";`)

    }

}
