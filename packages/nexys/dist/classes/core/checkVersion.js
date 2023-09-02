import isNewerVersion from "../../utils/version.js";
export default function checkVersion(core) {
    if (!core._APIValues || !core._APIValues.client)
        return;
    var isCloseToLimit = core._APIValues.logUsage >= core._APIValues.logUsageLimit * 0.8;
    var isOverLimit = core._APIValues.logUsage >= core._APIValues.logUsageLimit;
    var isNeedSoftUpdate = isNewerVersion(core._version, core._APIValues.client.softVersion);
    var isNeedHardUpdate = isNewerVersion(core._version, core._APIValues.client.hardVersion);
    var isNeedUpdate = isNewerVersion(core._version, core._APIValues.client.latestVersion);
    if (isCloseToLimit) {
        core.InternalLogger.log("NexysCore: You are getting close to log limit. Please consider to upgrade your plan.");
    }
    if (isOverLimit) {
        core.InternalLogger.log("NexysCore: You are over log limit. Please consider to upgrade your plan.");
    }
    if (!isNeedHardUpdate && (isNeedUpdate || isNeedSoftUpdate)) {
        core.InternalLogger.log("NexysCore: You are using version ".concat(core._version, " and latest version is ").concat(core._APIValues.client.softVersion, ". You need to upgrade your library."));
    }
    if (isNeedHardUpdate) {
        core.InternalLogger.error("NexysCore: You are using version ".concat(core._version, " and latest version is ").concat(core._APIValues.client.hardVersion, ". You wont be able to use Nexys with this version. Please upgrade your library."));
        //core._initialized = false;
    }
    core.InternalLogger.log("NexysCore: Version check done.");
}
