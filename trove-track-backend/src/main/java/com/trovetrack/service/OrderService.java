package com.trovetrack.service;

import com.trovetrack.dto.OrderDto;
import com.trovetrack.dto.OrderItemDto;
import com.trovetrack.entity.*;
import com.trovetrack.repository.ItemRepository;
import com.trovetrack.repository.OrderRepository;
import com.trovetrack.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service // Tells Spring to manage this class, contains business logic, allows for dependency injection
@RequiredArgsConstructor // Lombok annotation that allows constructor-based dependency injection
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final ItemRepository itemRepository;

    public OrderDto createOrder(OrderDto orderDto, String username) {
        // Fetch the user
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User with username " + username + " not found"));

        // Convert OrderDto to Order entity
        Order newOrder = convertToOrderEntity(orderDto, user);

        // Create a new list to hold the order items
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDto orderItemDto : orderDto.getOrderItems()) {
            // Fetch the corresponding item from the items table
            Item item = itemRepository.findById(orderItemDto.getItemId())
                    .orElseThrow(() -> new EntityNotFoundException("Item with id " + orderItemDto.getItemId() + " not found"));

            // Update the item's quantity based on the order's quantity
            int updatedQuantity = item.getQuantity() + orderItemDto.getQuantity();
            item.setQuantity(updatedQuantity);
            item.setPrice(orderItemDto.getPriceAtOrder());
            itemRepository.save(item);

            // Convert to OrderItem entity under the new order
            OrderItem orderItem = convertToOrderItemEntity(orderItemDto, newOrder);
            orderItems.add(orderItem);
        }

        // Set the order items to the new order
        newOrder.setOrderItems(orderItems);

        // Save the order to the database
        Order savedOrder = orderRepository.save(newOrder);

        // Convert and return the saved order as a DTO
        return convertToOrderDto(savedOrder);
    }

    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDto> orderDtos = new ArrayList<>();

        for (Order order : orders) {
            orderDtos.add(convertToOrderDto(order));
        }
        return orderDtos;
    }

    public OrderDto getOrderById(int id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order with ID " + id + " not found"));
        return convertToOrderDto(order);
    }

    private Order convertToOrderEntity(OrderDto orderDto, UserEntity user) {
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setOrderNumber(orderDto.getOrderNumber());
        order.setVendorName(orderDto.getVendorName());
        order.setUser(user);

        return order;
    }

    private OrderDto convertToOrderDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setOrderNumber(order.getOrderNumber());
        orderDto.setVendorName(order.getVendorName());

        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for (OrderItem orderItem : order.getOrderItems()) {
            OrderItemDto orderItemDto = convertToOrderItemDto(orderItem);
            orderItemDtos.add(orderItemDto);
        }
        orderDto.setOrderItems(orderItemDtos);

        return orderDto;
    }

    private OrderItem convertToOrderItemEntity(OrderItemDto orderItemDto, Order order) {
        OrderItem orderItem = new OrderItem();

        Item item = itemRepository.findById(orderItemDto.getItemId())
                .orElseThrow(() -> new EntityNotFoundException("Item with ID " + orderItemDto.getItemId() + " not found"));

        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setPriceAtOrder(orderItemDto.getPriceAtOrder());
        orderItem.setOrder(order);
        orderItem.setItem(item);

        return orderItem;
    }

    private OrderItemDto convertToOrderItemDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setOrderId(orderItem.getOrder().getId());
        orderItemDto.setItemId(orderItem.getItem().getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPriceAtOrder(orderItem.getPriceAtOrder());

        return orderItemDto;
    }
}
