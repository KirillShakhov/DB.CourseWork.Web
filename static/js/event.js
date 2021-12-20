function updateSite()
{
    updateInfo();
    updateCarsTable();
    updateAuctionTable();
    updateItemTable();
    updateTradeTable();
    updateBumpersTable();
    updateWheelsTable();
    updateArticleTable();
}

setInterval(updateSite, 3000);