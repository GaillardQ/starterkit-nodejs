import { Migration } from '@mikro-orm/migrations';

export class Migration20231119124930 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "example" ("id" serial primary key, "key" varchar(255) not null, "value" varchar(255) not null);');
  }

	async down(): Promise<void> {
		this.addSql('drop table "example"');
	}

}
