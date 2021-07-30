package com.mycollegeroomie;

import android.util.Log;

import com.onesignal.OSNotificationOpenedResult;
import com.onesignal.OneSignal;

import org.json.JSONObject;

public class MyNotificationOpenedHandler implements OneSignal.OSNotificationOpenedHandler {
    @Override
    public void notificationOpened(OSNotificationOpenedResult result) {
        JSONObject additionalData = result.getNotification().getAdditionalData();
        Log.d("OneSignalExample", "In MyNotificationOpenedHandler, additionalData: " + additionalData);

    }
}
