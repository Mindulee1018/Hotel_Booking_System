
const User = require('../Models/userModel'); 

const deleteUnverifiedAccounts = async () => {
  const ONE_MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000; 
  const cutoffDate = new Date(Date.now() - ONE_MONTH_IN_MILLISECONDS);

  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: cutoffDate },
    });

    console.log(`Deleted ${result.deletedCount} unverified accounts older than one month.`);
  } catch (error) {
    console.error('Error deleting unverified accounts:', error.message);
  }
};

module.exports = deleteUnverifiedAccounts;
