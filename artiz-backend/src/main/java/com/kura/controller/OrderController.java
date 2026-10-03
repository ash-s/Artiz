package com.kura.controller;

import com.kura.dto.OrderItemDto;
import com.kura.dto.OrderRequestDto;
import com.kura.model.Order;
import com.kura.model.OrderItem;
import com.kura.model.Product;
import com.kura.repository.OrderRepository;
import com.kura.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderController(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<Order> getOrderByNumber(@PathVariable String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@Valid @RequestBody OrderRequestDto dto) {
        Order order = new Order();
        order.setOrderNumber("KURA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomerName(dto.getCustomerName());
        order.setEmail(dto.getEmail());
        order.setShippingAddress(dto.getShippingAddress());
        order.setCity(dto.getCity());
        order.setPostalCode(dto.getPostalCode());
        order.setOrderStatus("CONFIRMED");

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        for (OrderItemDto itemDto : dto.getItems()) {
            Optional<Product> prodOpt = productRepository.findById(itemDto.getProductId());
            if (prodOpt.isPresent()) {
                Product product = prodOpt.get();
                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProduct(product);
                item.setSelectedSwatchName(itemDto.getSelectedSwatchName());
                item.setQuantity(itemDto.getQuantity());
                item.setUnitPrice(product.getBasePrice());

                BigDecimal lineTotal = product.getBasePrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
                total = total.add(lineTotal);
                items.add(item);
            }
        }

        order.setTotalAmount(total);
        order.setItems(items);

        Order saved = orderRepository.save(order);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("orderNumber", saved.getOrderNumber());
        response.put("totalAmount", saved.getTotalAmount());
        response.put("message", "Order confirmed with White Glove In-Home Delivery!");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
