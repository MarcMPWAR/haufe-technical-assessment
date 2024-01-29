const request = require("supertest");
const { app, server } = require("../src/server");
const connectDB = require("../src/services/db");
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await server.close(); // Use the server object to close the server
  await mongoose.disconnect();
});

describe('Character API', () => {
  test("It should return all characters from /api/characters", async () => {
    const response = await request(app).get("/api/characters");
    expect(response.status).toBe(200);
    expect(response.body.updatedCharacters).toBeInstanceOf(Array);
    
    const characterId = 20;
    const character = response.body.updatedCharacters.find((char) => char.id === characterId);
    expect(character).toBeDefined();
    expect(character).toHaveProperty("name", "Ants in my Eyes Johnson");
  });

  test("It should return the details of 1 character filtered by id /api/characters/:id", async () => {
    const characterId = 1;
    const response = await request(app).get(`/api/character/${characterId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty("id", characterId);
    expect(response.body[0]).toHaveProperty("name");
  });

  test("It should return the details of +1 character filtered by id /api/characters/:id", async () => {
    const characterId = "1,2";
    const response = await request(app).get(`/api/character/${characterId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    if (response.body.length > 0) {
      const firstCharacter = response.body[0];
      expect(firstCharacter).toHaveProperty("id", 1);
      expect(firstCharacter).toHaveProperty("name");
    }
  });
});
