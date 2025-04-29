import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Todo } from 'src/todos/entities/todo.entity';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todos post', async () => {
    const res = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Hello World!' })
      .expect(201);

    const body = res.body as Todo;

    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Hello World!');
  });

  it('/todo get', async () => {
    const res = await request(app.getHttpServer()).get('/todos').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/todo get one', async () => {
    const created = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'create test' })
      .expect(201);
    const createdBody = created.body as Todo;
    const id = createdBody.id;
    const res = await request(app.getHttpServer())
      .get(`/todos/${id}`)
      .expect(200);
    const body = res.body as Todo;

    expect(body).toHaveProperty('id', id);
    expect(body.title).toBe('create test');
  });

  it('/todo get one not found', async () => {
    await request(app.getHttpServer()).get(`/todos/9999`).expect(404);
  });

  it('/todo update one', async () => {
    const created = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'create test' })
      .expect(201);
    const createdBody = created.body as Todo;
    const id = createdBody.id;
    const updated = await request(app.getHttpServer())
      .patch(`/todos/${id}`)
      .send({ title: 'update test', isDone: true })
      .expect(200);
    const body = updated.body as Todo;

    expect(body.title).toBe('update test');
    expect(body.isDone).toBe(true);
  });

  it('/todo delete one', async () => {
    const created = await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'create test' })
      .expect(201);
    const createdBody = created.body as Todo;
    const id = createdBody.id;
    await request(app.getHttpServer()).delete(`/todos/${id}`).expect(200);

    const found = await prisma.todo.findUnique({ where: { id } });
    expect(found).toBeNull();
  });
});
