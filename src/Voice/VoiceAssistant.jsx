import React, { useContext, useEffect, useState } from "react";
import myContext from "../ontext/MyContext";

// Web Speech API for continuous listening
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; // Keep listening even after speech stops
recognition.interimResults = false; // Only process final words
recognition.lang = "en-US"; // Set language

const VoiceAssistant = () => {
  const {
    products,
    addProduct,
    deleteProduct,
    order,
    user,
    searchkey, setSearchKey,
    filterType, setFilterType,
    filterPrice, setFilterPrice
  } = useContext(myContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Apply search and filters dynamically
  useEffect(() => {
    let filtered = products;

    if (searchkey) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchkey.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === filterType.toLowerCase());
    }

    if (filterPrice) {
      filtered = filtered.filter((p) => parseInt(p.price) <= parseInt(filterPrice));
    }

    setFilteredProducts(filtered);
  }, [searchkey, filterType, filterPrice, products]);

  // Voice command processing
  const handleVoiceCommand = (command) => {
    command = command.toLowerCase();

    if (command.includes("show me")) {
      const category = command.replace("show me", "").trim();
      setFilterType(category);
      console.log(`Filtering products by category: ${category}`);
    } 
    
    else if (command.includes("find") && command.includes("under ₹")) {
      const match = command.match(/find (.+) under ₹(\d+)/);
      if (match) {
        const product = match[1].trim();
        const price = match[2].trim();
        setSearchKey(product);
        setFilterPrice(price);
        console.log(`Searching for ${product} under ₹${price}`);
      }
    } 
    
    else if (command.includes("add") && command.includes("to cart")) {
      const productName = command.replace("add", "").replace("to cart", "").trim();
      const productToAdd = products.find((p) => p.title.toLowerCase() === productName.toLowerCase());
      if (productToAdd) {
        addProduct(productToAdd);
        console.log(`${productName} added to cart`);
      } else {
        console.log(`${productName} not found`);
      }
    } 
    
    else if (command.includes("remove") && command.includes("from cart")) {
      const productName = command.replace("remove", "").replace("from cart", "").trim();
      const productToRemove = products.find((p) => p.title.toLowerCase() === productName.toLowerCase());
      if (productToRemove) {
        deleteProduct(productToRemove);
        console.log(`${productName} removed from cart`);
      } else {
        console.log(`${productName} not found in cart`);
      }
    }

    else if (command.includes("what's in my cart")) {
      console.log("Items in cart: ", order);
    } 
    
    else if (command.includes("proceed to checkout")) {
      console.log("Redirecting to checkout...");
      window.location.href = "/checkout";
    } 
    
    else if (command.includes("who am i") || command.includes("show my profile")) {
      console.log("User details:", user);
    }

    else {
      console.log("Command not recognized");
    }
  };

  // Start voice recognition when the component mounts
  useEffect(() => {
    recognition.start();
    console.log("Voice Assistant started...");
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log("Heard:", transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      if (event.error === "not-allowed") {
        console.warn("Microphone access denied. Please allow microphone permissions.");
      }
    };

    return () => {
      recognition.stop();
      console.log("Voice Assistant stopped.");
    };
  }, []);

  return (
    <div>
      <h2>Listening... 🎙️</h2>
      <p>Speak commands to control the shopping experience.</p>
    </div>
  );
};

export default VoiceAssistant;
