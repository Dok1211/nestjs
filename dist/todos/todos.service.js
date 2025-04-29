"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TodosService = class TodosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    todos = [];
    async create(data) {
        return this.prisma.todo.create({
            data: {
                title: data.title,
                isDone: false,
            },
        });
    }
    async findAll() {
        return this.prisma.todo.findMany();
    }
    async findOne(id) {
        const todo = await this.prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo with id ${id} not found`);
        }
        return todo;
    }
    async update(id, data) {
        return this.prisma.todo.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.todo.delete({ where: { id } });
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodosService);
//# sourceMappingURL=todos.service.js.map