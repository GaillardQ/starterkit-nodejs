// Node libs
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Example } from './ExampleEntity';

export class ExampleSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
		const example1 = em.create(Example, {
			key: 'Sing / Bass',
      value: 'Fat Mike'
    });

		const example2 = em.create(Example, {
			key: 'Lead Guitar',
      value: 'El Hefe'
    });

		const example3 = em.create(Example, {
			key: 'Rythm Guitar',
      value: 'Melvin ?'
    });

		const example4 = em.create(Example, {
			key: 'Drums',
      value: 'Erick ?'
    });

		const example5 = em.create(Example, {
			key: 'Keyboard',
      value: '???'
    });
	}

}
