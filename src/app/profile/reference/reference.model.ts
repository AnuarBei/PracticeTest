interface Content {
  id: number;
  body: string;
  title: string;
}

export interface Reference {
  id: number;
  contents: Content[];
}
