---
title: 'Integrating HTTP with Unity for Light Control'
description: 'A comprehensive guide on using HTTP requests to control Unity components such as lights, with real-time color adjustment functionality.'
pubDate: '2024'
heroImage: '/Uni.png'
keywords: [Unity, HTTP, Light Control, Real-time Updates]
---

In this tutorial, we'll explore how to use HTTP requests in Unity to control components such as lights. This approach enables us to adjust the light's properties remotely by sending HTTP requests to our Unity application. We'll build a basic HTTP server in Unity, allowing it to receive and process data to dynamically adjust a light's color.

For this task, I used a helpful [GitHub Gist](https://gist.github.com/amimaro/10e879ccb54b2cacae4b81abea455b10) as a starting point, which provided a basic HTTP listener for Unity. I then customized it to add color control capabilities.

### Step-by-Step Guide

The code below sets up a Unity HTTP server that listens for incoming POST requests with JSON data. The JSON should specify RGB color values, which we then use to adjust the color of a `Light` component in real-time.

```csharp
using UnityEngine;
using System;
using System.IO;
using System.Net;
using System.Threading;

public class Http : MonoBehaviour
{
    [Serializable]
    public class LightColor
    {
        public int r; // Red component (0-255)
        public int g; // Green component (0-255)
        public int b; // Blue component (0-255)
    }

    public string http;
    private HttpListener listener;
    private Thread listenerThread;
    public Light gg; // Reference to the Light component you want to control

    private SynchronizationContext mainThreadContext;

    void Start()
    {
        gg.intensity = 10; // Initial light intensity

        listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8562/");
        listener.Prefixes.Add("http://127.0.0.1:8562/");
        listener.Prefixes.Add("http://192.168.1.22:8562/");
        listener.AuthenticationSchemes = AuthenticationSchemes.Anonymous;
        listener.Start();

        listenerThread = new Thread(startListener);
        listenerThread.Start();
        Debug.Log("HTTP Server Started");

        // Capture SynchronizationContext of the main Unity thread
        mainThreadContext = SynchronizationContext.Current;
    }

    void Update()
    {
        // Unity's main update loop
    }

    private void startListener()
    {
        while (true)
        {
            var result = listener.BeginGetContext(ListenerCallback, listener);
            result.AsyncWaitHandle.WaitOne();
            Debug.Log("Received HTTP Request");
        }
    }

    private void ListenerCallback(IAsyncResult result)
    {
        var context = listener.EndGetContext(result);

        Debug.Log("Request Method: " + context.Request.HttpMethod);
        Debug.Log("Request URL: " + context.Request.Url.LocalPath);

        if (context.Request.HttpMethod == "POST")
        {
            Thread.Sleep(1000); // Simulate processing delay
            var data_text = new StreamReader(context.Request.InputStream, context.Request.ContentEncoding).ReadToEnd();
            Debug.Log("Received Data: " + data_text);

            // Parse JSON to LightColor class
            LightColor temp = JsonUtility.FromJson<LightColor>(data_text);

            // Validate RGB values are in the correct range
            if (temp.r >= 0 && temp.r <= 255 && temp.g >= 0 && temp.g <= 255 && temp.b >= 0 && temp.b <= 255)
            {
                Color color = new Color(temp.r / 255.0f, temp.g / 255.0f, temp.b / 255.0f);

                // Send the color update action back to the main Unity thread
                mainThreadContext.Post(_ =>
                {
                    gg.color = color; // Update light color
                    Debug.Log($"Light color set to R={temp.r}, G={temp.g}, B={temp.b}");
                }, null);
            }
            else
            {
                Debug.LogError("RGB values must be between 0 and 255.");
            }
        }

        context.Response.Close(); // Respond to the client
    }
}
