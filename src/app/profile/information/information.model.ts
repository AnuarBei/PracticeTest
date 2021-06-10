interface Content {
  id: number;
  body: string;
  title: string;
}

export interface Information {
  id: number;
  contents: Content[];
}
