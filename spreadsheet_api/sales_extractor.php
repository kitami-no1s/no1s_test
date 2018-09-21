<?php
header("Content-type: text/html; charset=utf-8");
$sheet_id = "11BCnspCt2Mut3nhc4WMY6CYTd0zF9C3eCzsk1AEpKLM"; // シートID
$range = "sales!A1:E6"; // 抽出範囲
$apikey = "APIKEY"; // APIキー

$url = "https://sheets.googleapi.com/v4/spreadsheets/" . $sheet_id . "/values/" . $range . "?key=" . $apikey;

$sales = getApiDataCurl($url);

if ($sales) {
    foreach ($sales["values"] as $values) {
        foreach ($values as $row) {
            echo "'" . $row . "',";
        }
        echo "\n";
    }
} else {
    echo "アクセスエラーが発生しました\n" . "URLを確認してください";
}

/**
 * データを抽出して配列にする
 *
 * @return array
 */
function getApiDataCurl($url)
{
    $option = [
        CURLOPT_RETURNTRANSFER => true, // 文字列として返す
        CURLOPT_TIMEOUT => 3 // タイムアウト時間
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, $option);

    $json = curl_exec($ch);
    $info = curl_getinfo($ch);
    $errorNo = curl_errno($ch);

    // OK以外はエラーなのでfalseを返す
    if ($errorNo !== CURLE_OK) {
        // タイムアウトの場合はCURLE_OPERATION_TIMEDOUT
        return false;
    }

    // 200以外のステータスコードは失敗とみなしfalseを返す
    if ($info['http_code'] !== 200) {
        return false;
    }

    // 配列にする
    $jsonArray = json_decode($json, true);

    return $jsonArray;
}
?>