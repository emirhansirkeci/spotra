# Spotra

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/emirhansirkeci/spotra/blob/main/README.md)

Spotra, internette dolaşırken içerikten kopmadan kolayca çeviri yapmanıza olanak sağlayan bir Chrome eklentisidir.

![Spotra example screenshot](./spotra.png?raw=true "Spotra")

## Uzantıyı Yüklemek ve Kullanmak

_**Not:** Uzantı henüz Chrome Web Mağazası'nda mevcut değil._

Bu uzantıyı hemen kullanmak veya geliştirmeye katkıda bulunmak isteyenler için aşağıdaki adımları takip edin.

1. Github deposunu bilgisayarınıza klonlayın veya ZIP dosyası olarak indirin.
2. Chrome tarayıcınızı açın ve sağ üst köşedeki üç noktaya tıklayın.
3. Açılan menüde `Uzantılar` seçeneğine gelin ve `Uzantıları yönet` butonuna tıklayın.
4. Sağ üst köşede `Geliştirici modu` seçeneğini etkinleştirin.
5. `Paketlenmemiş öğe yükle` üzerine tıklayın ve indirdiğiniz dosyadaki **client/** dizinini seçin.
6. Uzantıyı başarıyla yükledikten sonra aktif olan sekmelerinizi yenileyerek kullanmaya başlayabilirsiniz.

## Kısayollar

| Eylem            | MacOS                                          | Diğer                                            |
| ---------------- | ---------------------------------------------- | ------------------------------------------------ |
| Aç/Kapat         | <kbd>⌘</kbd> + <kbd>"</kbd>                    | <kbd>alt</kbd> + <kbd>"</kbd>                    |
| Dilleri Değiştir | <kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>"</kbd> | <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>"</kbd> |
| Anında Kopyala   | <kbd>⌘</kbd> + <kbd>enter</kbd>                | <kbd>alt</kbd> + <kbd>enter</kbd>                |
| Kapat            | <kbd>esc</kbd>                                 | <kbd>esc</kbd>                                   |

## _Server_

_Devam eden geliştirme süreci nedeniyle, şu anda sunucu tarafı için Vercel hobi planını kullanıyorum._

## Kurulum

```bash
git clone https://github.com/emirhansirkeci/spotra
cd spotra/server
npm install
```

## Çalıştırma Komutları

API'yı **(node index.js kullanarak)** başlatmak için aşağıdaki komutu kullanın.

```bash
npm run start
```

veya geliştirme modunda API'yi çalıştırmak için **(nodemon index.js)** aşağıdaki komutu kullanın.

```bash
npm run dev
```

Eğer **nodemon** yüklü değilse, aşağıdaki kodu kullanarak yükleyin

```bash
npm install -g nodemon
```

## Kullanılabilir Endpointler

<details>
<summary>POST /translate</summary>

## Request (İstek)

- `text` (string, zorunlu): Çevrilecek metin.
- `translateFrom` (string, isteğe bağlı): Kaynak dil kodu (örneğin, İngilizce için "en"). Eğer belirtilmezse, API otomatik olarak kaynak dilini tespit eder.
- `translateTo` (string, zorunlu): Hedef dil kodu (örneğin, İspanyolca için "es").

## Responses (Yanıtlar)

### Success

**Status:** 200 OK

```bash
{
  source: "en",
  target: "es",
  text: "Hello, World!",
  result: "¡Hola, Mundo!"
}
```

### Error

**Status:** 400 Bad Request

```bash
{
 code: 400,
 message: "Invalid request. Please provide a valid text parameter."
}
```

**Status:** 500 Internal Server Error

```bash
{
  code: 500,
  message: "Internal Server Error. Failed to fetch data."
}
```

</details>

## Desteklenen Diller

_Güncellenecek._

```bash
{
  Turkish: "tr",
  English: "en",
  Italian: "it",
  German: "de",
  Dutch: "nl",
  Japanese: "ja",
  Korean: "ko",
  French: "fr",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Swedish: "sv",
};
```
