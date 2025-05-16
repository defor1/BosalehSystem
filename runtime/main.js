const { app } = require("electron");
const { updateMain, runtimeMainPath } = require("./autoMainUpdater");
const fs = require("fs");

// شغل المحدث أولاً
updateMain(() => {
  if (fs.existsSync(runtimeMainPath)) {
    require(runtimeMainPath); // تشغيل النسخة الجديدة
  } else {
    // نسخة احتياطية - يمكن هنا تحط نسخة محلية لو تبي
    console.log("⚠️ No remote main.js found. Nothing to run.");
  }
});