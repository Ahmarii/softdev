---
title: 'Setting Up NeoPixelBus Light with ESPHome'
description: 'A guide to configuring NeoPixelBus Light with ESPHome for individually addressable LEDs like NeoPixel or WS2812.'
pubDate: '2024'
heroImage: '/EspHome.png'
keywords: [ESPHome, NeoPixelBus, NeoPixel, WS2812, RGB LED]
---

The `neopixelbus` light platform in ESPHome allows you to create RGB lights for individually addressable lights like NeoPixel or WS2812. This guide explains how to configure NeoPixelBus for various chipsets and includes an example configuration for ESP32 with MQTT.

### Important Notes
- **NeoPixelBus does not work with ESP-IDF.** For clockless lights, you can use the **ESP32 RMT LED Strip** platform.
- If you're using ESP8266, it’s recommended to connect the light strip to **GPIO3** to minimize flickering.

### Configuration Example
Below is a sample configuration for NeoPixelBus light on an ESP32-C3 device using MQTT for communication.

```yaml
light:
  - platform: neopixelbus
    type: GRB
    variant: WS2811
    pin: GPIO18
    num_leds: 8
    name: "NeoPixel Light"