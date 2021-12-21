import crypto from 'crypto';
import faker from 'faker';
import type { Knex } from 'knex';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

function makeSlug(title: string) {
  const randomBytes = crypto.randomBytes(4).toString('hex');
  const newTitle = `${title.substring(0, 83)}-${randomBytes}`;
  return slugify(newTitle, { lower: true, strict: true });
}

function getDescription() {
  return faker.lorem.paragraph().substring(0, 300);
}

export async function seed(knex: Knex) {
  await knex('suggestion').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u) => u.username === 'onosendi');
  const jim = users.find((u) => u.username === 'jim');
  const mike = users.find((u) => u.username === 'mike');

  const title1 = faker.lorem.sentence();
  const title2 = faker.lorem.sentence();
  const title3 = faker.lorem.sentence();
  const title4 = faker.lorem.sentence();
  const title5 = faker.lorem.sentence();

  const feature = await knex('suggestion_category')
    .select('id')
    .where({ category: 'feature' })
    .first();

  const ui = await knex('suggestion_category')
    .select('id')
    .where({ category: 'ui' })
    .first();

  const ux = await knex('suggestion_category')
    .select('id')
    .where({ category: 'ux' })
    .first();

  const enhancement = await knex('suggestion_category')
    .select('id')
    .where({ category: 'enhancement' })
    .first();

  return knex('suggestion').insert([
    {
      id: uuidv4(),
      title: title1,
      slug: makeSlug(title1),
      description: getDescription(),
      status: 'suggestion',
      user_id: onosendi.id,
      category_id: feature.id,
    },
    {
      id: uuidv4(),
      title: title2,
      slug: makeSlug(title2),
      description: getDescription(),
      status: 'suggestion',
      user_id: jim.id,
      category_id: feature.id,
    },
    {
      id: uuidv4(),
      title: title3,
      slug: makeSlug(title3),
      description: getDescription(),
      status: 'suggestion',
      user_id: jim.id,
      category_id: ui.id,
    },
    {
      id: uuidv4(),
      title: title4,
      slug: makeSlug(title4),
      description: getDescription(),
      status: 'live',
      user_id: jim.id,
      category_id: ux.id,
    },
    {
      id: uuidv4(),
      title: title5,
      slug: makeSlug(title5),
      description: getDescription(),
      status: 'planned',
      user_id: mike.id,
      category_id: enhancement.id,
    },
  ]);
}
