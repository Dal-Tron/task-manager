class MockTag {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export const mockTags = [
  new MockTag(1, 'Urgent'),
  new MockTag(2, 'Meeting'),
  new MockTag(3, 'Research'),
  new MockTag(4, 'Finance'),
  new MockTag(5, 'Development'),
  new MockTag(6, 'Marketing'),
  new MockTag(7, 'Client'),
];
