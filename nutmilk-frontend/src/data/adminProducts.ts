export type AdminProduct = {
  id: number;
  name: string;
  volume: string;
  category: string;
  price: number;
  stock: number;
  status: "in" | "out" | "low";
  image: string;
};

export const adminProducts: AdminProduct[] = [
  {
    id: 1,
    name: "Sữa Hạnh Nhân Nguyên Chất",
    volume: "500ml",
    category: "Sữa hạt",
    price: 45000,
    stock: 128,
    status: "in",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNLnXkSWWcpYSrnibZUm2c0SCbBUD6c33e5KD839cQCJdKbqPZiXJvcfvEDhd53TXzK5c76BnRTNw7yBo9DcZcPDMq7Yau1v1q2w5ludGUr5yJ-Mn5N8O1M_QYOfR9GrHtnbvn1o-M9eMDLlC_9oLzWufnXrF_4htPoAbHw0Mp7ynB1CwDFhxx9yqRdUcmxboxzHOmVQMiwUn_szmYBU5T0R4QnmB1YotExQSPm_fBHfYG_YDysLIZ4IzqnJNU02mw-UoXFBGDQ-w",
  },
  {
    id: 2,
    name: "Sữa Óc Chó Mè Đen",
    volume: "1000ml",
    category: "Sữa hạt",
    price: 80000,
    stock: 0,
    status: "out",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVUyDL9wU3u63MmKttTg6KwK4hJXMLSEp2cc_yxzGn4LcKPdD5Htwr7MugqrCRltmrYPnuccZcMWaju-dTEZtErSZJVuknz5cFRCxZdti7IQLHAwcFEDoDgNmzccN1WH66DavHvfKlMHUr_MVwQ0xMj8jjhBPYgd8SBpqNvAjJf8FXxaCUf0XB3yJQTJqH-0oy6JWtOBqBAPN6yVO2vWhqOZLqoEESLxMyw0GKJC-HeIkuyCceji8VVYH72cZF3A6Uvu7sfWwxfaI",
  },
  {
    id: 3,
    name: "Sữa Yến Mạch Tươi",
    volume: "250ml",
    category: "Yến mạch",
    price: 35000,
    stock: 45,
    status: "in",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhXr6EVcgQ4KABjhH3MoZkqgfJqo-CAKNUoXcVJQtEVJ493JEJ-7r9vJwreGmWNMGvIMOuJ6JYhKhVyRfo4nZe5v1nrZ_Cuujk518W2E2bOylqWBT3pUWMR2wBLl7qozbgKi5Mi2AFvOvjuo4YdJsxfHV7jxtz7l2ZnIdLybxO_TDk2MccS3xmo6Y1tNtFyz3h0xduWErfXeIHpSlS3yvqxVkBjIqfMZA1HCtcCbgPVt1Yu7gQKGc3jUeEBRAmhHdv5CZMfQTHm7E",
  },
  {
    id: 4,
    name: "Sữa Hạt Macca Cao Cấp",
    volume: "500ml",
    category: "Sữa hạt",
    price: 95000,
    stock: 3,
    status: "low",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSH9wPCIgcYBeFA-nSrddciW1Xv2sIHqUboEUJCyj5gmv6oacjR7TQf9w50dWpdfyslYqKY0jxz3LzTLIVDG3nkeW35qLJ3kkbk-uUvG43kSg-ia8iljTefNTCEbr4h4f9uSCEbLDwf5XxcZPp_AKiifE0G8XWAbmr2itBj9oSOrnqaFdHeDrt6wkqn0rgk7KoV6u8U9geKJ7j3PEPLXU8xn7pGSe9pjOPGwXWWdHFqvw0i_m_sZ5Hm37FBwMGpJRBwQurAHfmEWo",
  },
];
