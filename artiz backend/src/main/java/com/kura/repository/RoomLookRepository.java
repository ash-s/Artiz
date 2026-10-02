package com.kura.repository;

import com.kura.model.RoomLook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomLookRepository extends JpaRepository<RoomLook, Long> {
    Optional<RoomLook> findBySlug(String slug);
    List<RoomLook> findByRoomTypeIgnoreCase(String roomType);
}
