import faker from 'faker';
import type { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import makeSlug from '../../src/project/make-slug';

function getDescription() {
  return faker.lorem.paragraph().substring(0, 300);
}

function getTitle() {
  return faker.lorem.sentence().substring(0, 75);
}

export async function seed(knex: Knex) {
  await knex('feedback').del();

  const users = await knex('user').select('id', 'username');
  const onosendi = users.find((u) => u.username === 'onosendi');
  const jim = users.find((u) => u.username === 'jim');
  const mike = users.find((u) => u.username === 'mike');

  const title1 = getTitle();
  const title2 = getTitle();
  const title3 = getTitle();
  const title4 = getTitle();
  const title5 = getTitle();
  const title6 = getTitle();

  const categories = await knex('feedback_category');
  const feature = categories.find((c) => c.category === 'feature');
  const ui = categories.find((c) => c.category === 'ui');
  const ux = categories.find((c) => c.category === 'ux');
  const enhancement = categories.find((c) => c.category === 'enhancement');
  const bug = categories.find((c) => c.category === 'bug');

  return knex('feedback').insert([
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
    {
      id: uuidv4(),
      title: title6,
      slug: makeSlug(title6),
      description: getDescription(),
      status: 'in-progress',
      user_id: mike.id,
      category_id: bug.id,
    },
  ]);
}
