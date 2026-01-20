package com.nutmilk.admin.config;

import com.nutmilk.admin.entity.*;
import com.nutmilk.admin.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * DataSeeder component to populate initial data for the application.
 * Seeds Users, Categories, Products, Inventory, and Sample Orders.
 */
@Configuration
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategoriesAndProducts();
        seedOrders();
    }

    private void seedUsers() {
        // 1. Admin
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setEmail("admin@nutmilk.com");
            admin.setFullName("Quản Trị Viên");
            admin.setRole(Role.ADMIN);
            admin.setPhone("0909000111");
            userRepository.save(admin);
            System.out.println("Seeded Admin: admin");
        }

        // 2. Users
        if (userRepository.findByUsername("user1").isEmpty()) {
            createUser("user1", "Nguyễn Văn An", "an.nguyen@email.com", "0912345678", "123 Lê Lợi, TP.HCM", Role.USER);
        }
        if (userRepository.findByUsername("user2").isEmpty()) {
            createUser("user2", "Trần Thị Bé", "be.tran@email.com", "0987654321", "456 Nguyễn Huệ, TP.HCM", Role.USER);
        }

        // 3. Staff & Managers
        if (userRepository.findByUsername("staff_kho").isEmpty()) {
            createUser("staff_kho", "Lê Văn Kho", "kho@nutmilk.com", "0911000888", "Kho Tổng", Role.MANAGER);
        }
        if (userRepository.findByUsername("staff_sale").isEmpty()) {
            createUser("staff_sale", "Phạm Thị Sale", "sale@nutmilk.com", "0911000999", "Cửa Hàng 1", Role.STAFF);
        }
    }

    private void createUser(String username, String fullName, String email, String phone, String address, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode("123456"));
        user.setEmail(email);
        user.setFullName(fullName);
        user.setRole(role);
        user.setPhone(phone);
        user.setAddress(address);
        userRepository.save(user);
        System.out.println("Seeded User: " + username);
    }

    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() > 0)
            return;

        // Categories
        Category catHat = createCategory("Sữa Hạt Nguyên Chất", "Sữa được làm từ 100% hạt tự nhiên");
        Category catMix = createCategory("Sữa Hạt Mix", "Sự kết hợp hoàn hảo giữa các loại hạt");
        Category catGranola = createCategory("Granola & Ngũ Cốc", "Ngũ cốc dinh dưỡng ăn sáng");
        Category catTet = createCategory("Quà Tết 2026", "Bộ quà tặng sức khỏe cho năm mới");

        // Products - Sữa Hạt
        createProduct("Sữa Hạnh Nhân Organic (1L)", new BigDecimal("125000"),
                "Sữa hạnh nhân nguyên chất, giàu Vitamin E và Omega-3. Phù hợp cho người ăn kiêng.", catHat,
                "/assets/products/hanh-nhan.png");
        createProduct("Sữa Óc Chó Đỏ (1L)", new BigDecimal("145000"),
                "Sữa óc chó đỏ cao cấp, tốt cho phát triển trí não trẻ em.", catHat, "/assets/products/pt2.png");
        createProduct("Sữa Đậu Nành Mè Đen", new BigDecimal("45000"),
                "Sự kết hợp truyền thống, giàu canxi và đạm thực vật.", catHat, "/assets/products/pt3.png");
        createProduct("Sữa Hạt Điều (500ml)", new BigDecimal("65000"),
                "Vị béo ngậy tự nhiên từ hạt điều Bình Phước.", catHat, "/assets/products/pt4.png");

        // Products - Mix
        createProduct("Sữa Hạnh Nhânmix Yến Mạch", new BigDecimal("110000"),
                "Giàu chất xơ, hỗ trợ tiêu hóa tốt.", catMix, "/assets/products/pt5.png");
        createProduct("Sữa 5 Loại Hạt Cao Cấp", new BigDecimal("160000"),
                "Hạnh nhân, óc chó, macca, điều, dẻ cười.", catMix, "/assets/products/pt6.png");
        createProduct("Sữa Gạo Lứt Huyết Rồng", new BigDecimal("55000"),
                "Thanh lọc cơ thể, hỗ trợ giảm cân.", catMix, "/assets/products/pt7.png");

        // Products - Granola
        createProduct("Granola Siêu Hạt (500g)", new BigDecimal("250000"),
                "Nướng mật ong nguyên chất, 80% là hạt.", catGranola, "/assets/products/pt8.png");
        createProduct("Granola Chocolate (500g)", new BigDecimal("260000"),
                "Vị socola đen đậm đà, không đường tinh luyện.", catGranola, "/assets/products/pt9.png");

        // Products - Tết
        createProduct("Set Quà Như Ý", new BigDecimal("599000"),
                "1 Chai sữa hạt, 1 Hũ Granola, 1 Hộp hạt sấy.", catTet, "/assets/products/qua-tet-1.png");
        createProduct("Set Quà Phú Quý", new BigDecimal("899000"),
                "2 Chai sữa hạt cao cấp, 2 Hũ hạt dinh dưỡng.", catTet, "/assets/products/qua-tet-2.png");

        System.out.println("Seeded Categories and Products");
    }

    private Category createCategory(String name, String desc) {
        Category c = new Category();
        c.setName(name);
        c.setDescription(desc);
        return categoryRepository.save(c);
    }

    private void createProduct(String name, BigDecimal price, String desc, Category cat, String img) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setDescription(desc);
        p.setCategory(cat);
        p.setImage(img);
        p.setStatus(1); // Active
        p = productRepository.save(p);

        // Inventory
        Inventory inv = new Inventory();
        inv.setProductId(p.getId());
        inv.setQuantity(100);
        inv.setUpdatedAt(LocalDateTime.now());
        inventoryRepository.save(inv);
    }

    private void seedOrders() {
        if (orderRepository.count() > 0)
            return;

        Optional<User> u1Opt = userRepository.findByUsername("user1");
        Optional<User> u2Opt = userRepository.findByUsername("user2");

        if (u1Opt.isPresent()) {
            User u1 = u1Opt.get();

            // Order 1: Delivered
            createOrder(u1, "DELIVERED", LocalDateTime.now().minusDays(5), "HCM", "0912345678",
                    List.of("Sữa Hạnh Nhân Organic (1L)", "Granola Siêu Hạt (500g)"));

            // Order 2: Pending
            createOrder(u1, "PENDING", LocalDateTime.now().minusHours(2), "HN", "0912345678",
                    List.of("Set Quà Như Ý"));
        }

        if (u2Opt.isPresent()) {
            User u2 = u2Opt.get();

            // Order 3: Cancelled
            createOrder(u2, "CANCELLED", LocalDateTime.now().minusDays(10), "Da Nang", "0987654321",
                    List.of("Sữa Đậu Nành Mè Đen"));
        }

        System.out.println("Seeded Orders");
    }

    private void createOrder(User user, String status, LocalDateTime date, String address, String phone,
            List<String> productNames) {
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(date);
        order.setUpdatedAt(date);
        order.setStatus(status);
        order.setShippingAddress(address);
        order.setShippingPhone(phone);
        order.setTotalPrice(BigDecimal.ZERO); // Temporary

        order = orderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;
        List<Product> allProducts = productRepository.findAll();

        for (String pName : productNames) {
            Optional<Product> pOpt = allProducts.stream()
                    .filter(p -> p.getName().equalsIgnoreCase(pName))
                    .findFirst();

            if (pOpt.isPresent()) {
                Product p = pOpt.get();
                OrderDetail d = new OrderDetail();
                d.setOrder(order);
                d.setProduct(p);
                d.setQuantity(1);
                d.setPrice(p.getPrice());
                d.setCreatedAt(date);
                d.setUpdatedAt(date);
                orderDetailRepository.save(d);

                total = total.add(p.getPrice());
            }
        }

        order.setTotalPrice(total);
        orderRepository.save(order);
    }
}
