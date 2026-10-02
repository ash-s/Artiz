package com.kura.controller;

import com.kura.model.RoomLook;
import com.kura.repository.RoomLookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/room-looks")
@CrossOrigin(origins = "*")
public class RoomLookController {

    private final RoomLookRepository roomLookRepository;

    public RoomLookController(RoomLookRepository roomLookRepository) {
        this.roomLookRepository = roomLookRepository;
    }

    @GetMapping
    public List<RoomLook> getAllRoomLooks(@RequestParam(required = false) String room) {
        if (room != null && !room.isBlank()) {
            return roomLookRepository.findByRoomTypeIgnoreCase(room);
        }
        return roomLookRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomLook> getRoomLookById(@PathVariable Long id) {
        return roomLookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<RoomLook> getRoomLookBySlug(@PathVariable String slug) {
        return roomLookRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
