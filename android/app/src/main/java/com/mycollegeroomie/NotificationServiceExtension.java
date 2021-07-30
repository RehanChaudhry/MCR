package com.mycollegeroomie;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import org.json.JSONObject;
import com.onesignal.OSNotification;
import com.onesignal.OSNotificationReceivedEvent;
import com.onesignal.OneSignal.OSRemoteNotificationReceivedHandler;
import com.onesignal.shortcutbadger.ShortcutBadger;

@SuppressWarnings("unused")
public class NotificationServiceExtension implements OSRemoteNotificationReceivedHandler {

    private SharedPreferences mPrefs;

    @Override
    public void remoteNotificationReceived(Context context, OSNotificationReceivedEvent notificationReceivedEvent) {
        OSNotification notification = notificationReceivedEvent.getNotification();

        mPrefs = context.getSharedPreferences("BadgeCountFile", Context.MODE_PRIVATE);

        //Example of modifying the notification's accent color
//        OSMutableNotification mutableNotification = notification.mutableCopy();
//        mutableNotification.setExtender(builder -> builder.setColor(context.getResources().getColor(R.color.colorPrimary)));

        JSONObject data = notification.getAdditionalData();
        Log.d("OneSignalExample", "notification: " + notification.toJSONObject());
        Log.d("OneSignalExample", "getAdditionalData: " + data);

        // If complete isn't call within a time period of 25 seconds, OneSignal internal logic will show the original notification
        // To omit displaying a notification, pass `null` to complete()
        notificationReceivedEvent.complete(notification);


        ShortcutBadger.applyCount(context,mPrefs.getInt("BadgeCount", 0) + 1);
        mPrefs.edit().putInt("BadgeCount",mPrefs.getInt("BadgeCount", 0) + 1).apply();
    }
}