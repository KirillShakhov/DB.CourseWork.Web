function updateSite()
{
    updateInfo();
    updateCarsTable();
    updateAuctionTable();
    updateItemTable();
    updateTradeTable();
    updateBumpersTable();
    updateWheelsTable();
}

setInterval(updateSite, 3000);