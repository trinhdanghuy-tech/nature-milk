export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  image: string;
  category: "almond" | "walnut" | "oat" | "mix" | "other";
};


export const products: Product[] = [
  {
    id: 1,
    name: "Sữa Hạnh Nhân",
    desc: "Giàu Vitamin E, hỗ trợ làm đẹp da",
    price: 125000,
    oldPrice: 145000,
    rating: 4.9,
    badge: "-15%",
    category: "almond",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChFqfmyBkeBw-U67T_bJXoo9usXrWmnUlXJlPVJT2IIHTTqCLiK8MjNj_QMw4hMhHRahh3iNk10AMQ_fs8livFqnJqndloRxxSvTC68RVbtPjvgJPjL6L9ICAZHa0ADuoOV71t3fAAt0Ezwx5JUrQaCKLngbgaqJMAl62ihpZgRGuuQ6blBvzSZx0nQDV8GRnhgMWK2tiXoK0q65youHuOe8RN8iPxRwbyk6wrKxy8kHIcZ0L018IYWjq0QZQhUe5W8xMegqGEttg",
  },
  {
    id: 2,
    name: "Sữa Óc Chó",
    desc: "Tốt cho trí não và tim mạch",
    price: 135000,
    rating: 4.8,
    category: "walnut",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYgvQo6UxoYgRKt2EPtjmtL_P4X4zW09HryRyKHkZV6JZncdvDbNxbu-v-U2DfnIonvKfLhZtE2x0ROTpUZjbHIJnVOZ7X-nEDFBDdRny3rK2Z3fL0JepJmKAcytw9Y-NHJAmLOEpBMV6-ZipOCMGrEi8KxazlFpNIMe3u_Q47NRRpl8R_5KVwiFw2PXkkIRRRSClOsD7y3jS6cnX8MesRVcVP9J-XxuyCEE3xNkmWgc3GE6aIUYZuwiIR0oWJef6u-gI0r2ABCyE",
  },
  {
    id: 3,
    name: "Sữa Yến Mạch",
    desc: "Giàu chất xơ, hỗ trợ giảm cân",
    price: 95000,
    rating: 5.0,
    badge: "Best Seller",
    category: "oat",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD06PmHRf1zLIp4KwT_pCV9B664QxKkisIY7HajYTqpbL-U_3oOpJSg_zefVzbDZqeoWG-6nP2WCpyfatTEaP4Upl3qIZUVtiRFY9NdLUQL7i0BR3qwiXK5lB5Ru-sI3dR_wR0soDnz-0AC-BXVfwFYzzLvi3EdfecCtRz9KiizkdI7_e3rJXLJQJL5e2tY19rQex1_IkzbWemY-tIu9uFNvOIZNFuheTlQl0QpaAeOHpQFPbzFaOXB-0A52aurVva2yA3eKVgoo2s",
  },
  {
    id: 4,
    name: "Mix 5 Loại Hạt",
    desc: "Dinh dưỡng toàn diện cho cả nhà",
    price: 155000,
    rating: 4.7,
    category: "mix",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6WO_RZlRC05v_zTGMY2xkKVqGgl8HfC23LGFp_pw-CyskbgyDgHO5_1v268rXhPqzL8OsEZDZhpAALOQ9PR1w4gbGNYFw7SbFSw-zhkv5ir2doYSPCdDfpJ_6VrMHrrz2ljAG9-0YemP53O-DfFvUSjRNe4MgtDCAFpLx4jW7eXP81Tfj7uZNCbFcS_dM32zo3DpmK6Zd1N15bNpNbdUJNKvTgMCP14HiWufrzmozv7mG3CVSXGx6oLDOHfcFxG3byUnT3XggIRk",
  },
  {
    id: 5,
    name: "Sữa Đậu Nành",
    desc: "Thơm ngon, đậm đà truyền thống",
    price: 80000,
    rating: 4.5,
    category: "other",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZgUovy4jHs3S5DnNqppcGl93g_XwhvMoMzdRad4_nxEIIhy18vEBcxznsmxGyIsReo9geKzDIW0iYeucGB6BVh6GAHEkbffFZiEzCDCNyW7A4hmgGnq0xq9_FJ0Xb2OjydPoaN3AYx6Sa9STfcBBOOYpgqQGyB52En1SOqWcFf335CqxD7uTR2OlK29-nVqdoIETCkOPzCVAOoJbd2iAmhyJsHubp-J-q_Us-f2Boml71IItC5VSFk_u8bRqUOSVSZyaMptWMcqg",
  },
  {
    id: 6,
    name: "Sữa Mắc Ca",
    desc: "Nữ hoàng của các loại hạt",
    price: 180000,
    rating: 4.8,
    category: "other",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsHvWXHnBL__o0hTKdoCxqpFdj0mr5uxIlDWmtMSPFZGZ07mNDTF7dOEoSn7VW4QMxfBzqBkUnuYuxCl0874qmyr9WQt0H_Dy4dtCutY_vG_utz9adyxDS2xzLukHcQOU8RzCwPMHwCw8YI5Cze0wlDvtfBAuC_KPYno-rAWG6Wqkr2vYn9jvBiXFVvGPh66jH-HlZ2DJ_eM4IAkvuC-CfvtlndSoiJHsfJqJ4uDmFza4KW2lLUbL8FwKBbNadwgl4wof_SwfhEuA",
  },
  {
    id: 7,
    name: "Sữa Hạt Điều",
    desc: "Ngọt dịu, béo ngậy tự nhiên",
    price: 130000,
    rating: 4.6,
    badge: "Mới",
    category: "other",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt6Hux4GAeWD0UjO57V69pmJe-4XLBZHJ0N5atEGeYrQB-pA9aKoLvrXhwmHEujDGObVUDz88PV05RqYm55kz4P7Ej36CObtWrGA8VZvPEGBUt6Q_5BeuNtwM9HQLfGjCz2S525eIsHaMwolohOhIjCLvbmHNaVR0A-4o3jn4pD87_usjjAN7_c0_72u4Uk37ODhIJAkM0wDQ62oBHMS9ZeWl717vBH50d0zpaNqS45sbBhsl_94Hznv7c1rUD8QhLhpXkQQKg_Ic",
  },
  {
    id: 8,
    name: "Sữa Hạt Dẻ Cười",
    desc: "Hương vị độc đáo, cao cấp",
    price: 190000,
    rating: 4.9,
    category: "other",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRg2Uuwrme44D8F1zQdL1zJDX2dBz4Ls-6dQaddS3sPO-G7Y6q8Qc2J75k1ebUUoaFvsTvxqq0DG8qvVclGHHkIQAQ49mYB9itA_68iIvpwUeXOzSKvI9xtGJ-NgvuCZL7S1fLHlHa-4xIVfnpdeZ_IuvXlek8NKLyf0zg9xYQjYiWhIK-e8jibDV0OINyzj5QVUhRrsFXmBGtEX_ppo_cOiBTUD0LU0tpRWaFLztOPqxbepPKb8xnPHlQ-K8mpeLTNqBvgXvLJXk",
  },
];
