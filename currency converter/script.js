document.getElementById("convertBtn").addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("result");

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    if (!response.ok) throw new Error("Failed to fetch exchange rates.");
    
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching exchange rates. Please try again.";
    console.error(error);
  }
});
