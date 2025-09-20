// Mock service to simulate database operations
// This will be replaced with real API calls later

export class MockStorage {
  private static getKey(entity: string, userId?: string): string {
    return userId ? `${entity}_${userId}` : entity;
  }

  static save<T>(entity: string, data: T, userId?: string): void {
    const key = this.getKey(entity, userId);
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load<T>(entity: string, userId?: string): T | null {
    const key = this.getKey(entity, userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static remove(entity: string, userId?: string): void {
    const key = this.getKey(entity, userId);
    localStorage.removeItem(key);
  }

  static loadList<T>(entity: string, userId?: string): T[] {
    const data = this.load<T[]>(entity, userId);
    return data || [];
  }

  static saveToList<T extends { id: string }>(
    entity: string, 
    newItem: T, 
    userId?: string
  ): void {
    const list = this.loadList<T>(entity, userId);
    const existingIndex = list.findIndex(item => item.id === newItem.id);
    
    if (existingIndex >= 0) {
      list[existingIndex] = newItem;
    } else {
      list.push(newItem);
    }
    
    this.save(entity, list, userId);
  }
}