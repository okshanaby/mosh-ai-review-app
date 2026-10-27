#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1528a55bc041e3ed4ed21850533c671fae79273265dbd02917cf93600622c2fe/contract';
import endContract from '../../snapshots/1528a55bc041e3ed4ed21850533c671fae79273265dbd02917cf93600622c2fe/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/98038b36350e4e1c9843a2f4d6cb26c4358bf264956ee3f837f456a2c797d498/contract';
import startContract from '../../snapshots/98038b36350e4e1c9843a2f4d6cb26c4358bf264956ee3f837f456a2c797d498/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Review' }),
      this.dropTable({ schema: 'public', table: 'Summary' }),
      this.dropTable({ schema: 'public', table: 'Product' }),
      this.createTable({
        schema: 'public',
        table: 'products',
        columns: [
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('price', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'reviews',
        columns: [
          col('author', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('productId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('rating', 'int2', { notNull: true, codecRef: { codecId: 'pg/int2@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'summaries',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('generatedAt', 'timestamptz', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('productId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'summaries',
        constraint: 'summaries_productId_key',
        columns: ['productId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'reviews',
        index: 'reviews_productId_idx_5858600a',
        columns: ['productId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'reviews',
        foreignKey: {
          name: 'reviews_productId_fkey',
          columns: ['productId'],
          references: { schema: 'public', table: 'products', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'summaries',
        foreignKey: {
          name: 'summaries_productId_fkey',
          columns: ['productId'],
          references: { schema: 'public', table: 'products', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
