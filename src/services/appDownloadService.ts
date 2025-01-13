import { supabase } from '../lib/supabaseClient';

interface AppDownloadUrls {
  ios_app_store: string | null;
  android_google_play: string | null;
  android_direct_download: string | null;
  huawei_app_gallery: string | null;
  xiaomi_app_store: string | null;
  oppo_app_store: string | null;
  vivo_app_store: string | null;
  samsung_galaxy_store: string | null;
}

export const getAppDownloadUrl = async (): Promise<string | null> => {
  try {
    // 获取下载链接数据
    const { data, error } = await supabase
      .from('app_downloads')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching app_downloads:', error);
      throw error;
    }

    console.log('App downloads data:', data);

    const urls = data as AppDownloadUrls;
    const userAgent = navigator.userAgent.toLowerCase();
    console.log('User agent:', userAgent);

    // iOS 设备
    if (/iphone|ipad|ipod/.test(userAgent)) {
      console.log('Detected iOS device, returning:', urls.ios_app_store);
      return urls.ios_app_store;
    }

    // Android 设备
    if (/android/.test(userAgent)) {
      console.log('Detected Android device');
      
      // 各品牌机型判断
      if (/huawei|honor/.test(userAgent)) {
        console.log('Detected Huawei device, returning:', urls.huawei_app_gallery);
        return urls.huawei_app_gallery;
      }
      if (/xiaomi|miui/.test(userAgent)) {
        console.log('Detected Xiaomi device, returning:', urls.xiaomi_app_store);
        return urls.xiaomi_app_store;
      }
      if (/oppo/.test(userAgent)) {
        console.log('Detected OPPO device, returning:', urls.oppo_app_store);
        return urls.oppo_app_store;
      }
      if (/vivo/.test(userAgent)) {
        console.log('Detected vivo device, returning:', urls.vivo_app_store);
        return urls.vivo_app_store;
      }
      if (/samsung/.test(userAgent)) {
        console.log('Detected Samsung device, returning:', urls.samsung_galaxy_store);
        return urls.samsung_galaxy_store;
      }

      console.log('Using default Android store, returning:', urls.android_google_play || urls.android_direct_download);
      return urls.android_google_play || urls.android_direct_download;
    }

    console.log('Using direct download link, returning:', urls.android_direct_download);
    return urls.android_direct_download;
  } catch (error) {
    console.error('Error getting app download URL:', error);
    return null;
  }
}; 