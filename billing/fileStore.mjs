import fs from 'node:fs/promises';
import path from 'node:path';

export function createEmptyBillingState() {
  return {
    version: 1,
    users: {},
    customerToUser: {},
    processedEvents: {},
    audits: [],
  };
}

export function createJsonFileStore(filePath) {
  let writeQueue = Promise.resolve();

  async function read() {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        ...createEmptyBillingState(),
        ...parsed,
        users: parsed.users ?? {},
        customerToUser: parsed.customerToUser ?? {},
        processedEvents: parsed.processedEvents ?? {},
        audits: Array.isArray(parsed.audits) ? parsed.audits : [],
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return createEmptyBillingState();
      }
      throw error;
    }
  }

  async function write(nextState) {
    writeQueue = writeQueue.then(async () => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(nextState, null, 2) + '\n', 'utf8');
    });
    return writeQueue;
  }

  return {
    read,
    write,
  };
}
