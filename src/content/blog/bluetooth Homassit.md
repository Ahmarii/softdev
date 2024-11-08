---
title: 'Connecting Bluetooth Devices with Home Assistant'
description: 'A step-by-step guide to pairing Bluetooth devices with Home Assistant, enabling seamless media playback on Bluetooth speakers.'
pubDate: '2024'
heroImage: '/Home.png'
keywords: [Home Assistant, Bluetooth, Media Player]
---

In this guide, we’ll look at how to pair and connect Bluetooth devices with Home Assistant, specifically setting up a Bluetooth speaker as a media player. This can be a tricky process, but by following these steps, you’ll have your Home Assistant playing audio on your Bluetooth speaker in no time.

### Step-by-Step Guide for Bluetooth Pairing

For reference, this guide is based on information from [this community thread](https://community.home-assistant.io/t/bluetooth-speaker-as-media-player/194673/42), which provides useful troubleshooting tips for setting up Bluetooth with Home Assistant.

#### 1. Setting up the Bluetooth Adapter

First, ensure you have a compatible Bluetooth adapter connected to your Home Assistant instance. Some adapters, such as the **EDIMAX BT-8500**, work reliably, while others may experience pairing issues.

> **Note**: During pairing, it may help to repeatedly run the pairing commands if it does not connect immediately.

#### 2. Pairing the Bluetooth Speaker

Use the following `bluetoothctl` commands to scan, pair, and connect your Bluetooth speaker:

```bash
bluetoothctl scan on                   # Start scanning for devices
bluetoothctl devices                   # List available devices
bluetoothctl pair xx:xx:xx:xx:xx:xx     # Pair with your device (replace with device address)
bluetoothctl trust xx:xx:xx:xx:xx:xx    # Mark the device as trusted
bluetoothctl connect xx:xx:xx:xx:xx:xx  # Connect to your device