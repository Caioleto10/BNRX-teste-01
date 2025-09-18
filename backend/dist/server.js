"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./lib/prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Backend BRN Networks está no ar!' });
});
app.post('/providers', async (req, res) => {
    try {
        const { companyName, contactName, contactInfo } = req.body;
        if (!companyName || !contactName || !contactInfo) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const newProvider = await prisma_1.prisma.provider.create({
            data: {
                companyName,
                contactName,
                contactInfo,
            },
        });
        return res.status(201).json(newProvider);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o provedor.' });
    }
});
app.get('/providers', async (req, res) => {
    try {
        const providers = await prisma_1.prisma.provider.findMany();
        return res.status(200).json(providers);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar os provedores.' });
    }
});
app.get('/providers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const provider = await prisma_1.prisma.provider.findUnique({
            where: { id },
        });
        if (!provider) {
            return res.status(404).json({ error: 'Provedor não encontrado.' });
        }
        return res.status(200).json(provider);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar o provedor.' });
    }
});
app.put('/providers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, contactName, contactInfo } = req.body;
        const updatedProvider = await prisma_1.prisma.provider.update({
            where: { id },
            data: {
                companyName,
                contactName,
                contactInfo,
            },
        });
        return res.status(200).json(updatedProvider);
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Provedor não encontrado.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar o provedor.' });
    }
});
app.delete('/providers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.provider.delete({
            where: { id },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Provedor não encontrado.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao excluir o provedor.' });
    }
});
// =============================================
//               ROTAS PARA DEMANDAS
// =============================================
app.post('/demands', async (req, res) => {
    try {
        const { title, description, type, providerId } = req.body;
        if (!title || !description || !type || !providerId) {
            return res.status(400).json({ error: 'Título, descrição, tipo e ID do provedor são obrigatórios.' });
        }
        const newDemand = await prisma_1.prisma.demand.create({
            data: {
                title,
                description,
                type,
                providerId,
            },
        });
        return res.status(201).json(newDemand);
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2003') {
            return res.status(404).json({ error: 'Provedor não encontrado.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao criar a demanda.' });
    }
});
app.get('/demands', async (req, res) => {
    try {
        const demands = await prisma_1.prisma.demand.findMany({
            include: {
                provider: true,
            },
        });
        return res.status(200).json(demands);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar as demandas.' });
    }
});
app.get('/demands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const demand = await prisma_1.prisma.demand.findUnique({
            where: { id },
            include: {
                provider: true,
                actions: true,
            },
        });
        if (!demand) {
            return res.status(404).json({ error: 'Demanda não encontrada.' });
        }
        return res.status(200).json(demand);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao buscar a demanda.' });
    }
});
app.put('/demands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, type, status } = req.body;
        const updatedDemand = await prisma_1.prisma.demand.update({
            where: { id },
            data: {
                title,
                description,
                type,
                status,
            },
        });
        return res.status(200).json(updatedDemand);
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Demanda não encontrada.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao atualizar a demanda.' });
    }
});
app.delete('/demands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.demand.delete({
            where: { id },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Demanda não encontrada.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao excluir a demanda.' });
    }
});
// =============================================
//            ROTAS PARA AÇÕES TÉCNICAS
// =============================================
app.post('/demands/:demandId/actions', async (req, res) => {
    try {
        const { demandId } = req.params;
        const { description, technicianName } = req.body;
        if (!description || !technicianName) {
            return res.status(400).json({ error: 'Descrição e nome do técnico são obrigatórios.' });
        }
        const newAction = await prisma_1.prisma.action.create({
            data: {
                description,
                technicianName,
                demandId,
            },
        });
        return res.status(201).json(newAction);
    }
    catch (error) {
        console.error(error);
        if (error.code === 'P2003') {
            return res.status(404).json({ error: 'Demanda não encontrada.' });
        }
        return res.status(500).json({ error: 'Ocorreu um erro ao criar a ação.' });
    }
});
app.listen(3333, () => {
    console.log('🚀 Servidor backend rodando na porta 3333');
});
