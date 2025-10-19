const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'amorflowersfl.com',
  port: 465,
  secure: true,
  auth: {
    user: 'no-reply@amorflowersfl.com',
    pass: 'Flowers@mor25',
  },
});

const sendEmailConfig = {
  to: [
    'amorflowersfl@gmail.com',
    'hello.olga20@gmail.com',
    'makskondratenko24081992@gmail.com',
  ],
  name: 'Amor Flowers',
  domain: 'https://amorflowersfl.com',
};

function centsToDollars(cents) {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
}

// --- Для заказов (Order) ---
function getProductRows(products) {
  if (!products || !products.length) return '';
  return products
    .map(
      (product) => `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid #f0e6eb;">
        <table width="100%" style="border-collapse:collapse;">
          <tr>
            <td width="90" style="vertical-align:top;">
              <img 
                src="${sendEmailConfig.domain}${product.primaryImage}"
                alt="${product.title}" 
                style="width:80px; height:80px; object-fit: cover; border-radius:6px; border:1px solid #eee;"
              >
            </td>
            <td style="padding-left:18px; vertical-align:top;">
              <div style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:16px; font-weight:600; margin-bottom:3px;">
                ${product.title}
              </div>
              <div style="color:#555; font-size:14px; margin-bottom:2px;">
                Размер: ${product.size.name}
              </div>
              <div style="color:#555; font-size:14px; margin-bottom:2px;">
                Количество: <b>${product.quantity}</b>
              </div>
              <div style="color:#8e6c88; font-size:14px; margin-bottom:2px;">
                Цена: <b>$${centsToDollars(product.total)}</b>
              </div>
              ${
                product.extras && product.extras.length
                  ? `
                <div style="color:#555; font-size:13px; margin-top:4px;">
                  Дополнительно: <br>
                  ${product.extras.map((extra) => extra.name).join('<br>')}
                </div>
              `
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join('');
}

function getOrderHtmlBody(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
      </style>
    </head>
    <body style="margin:0; padding:0; font-family:'Montserrat',Arial,sans-serif; background-color:#f9f6fa;">
      <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; margin:0 auto;">
        <tr>
          <td style="background:#ffffff; padding:30px 0 10px; text-align:center; border-bottom:1px solid #f0e6eb;">
            <img src="${
              sendEmailConfig.domain
            }/img/logo-amor-flowers.b23ab669.png" alt="Amor Flowers" style="height:100px; max-width:200px; display:block; margin:0 auto;">
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff; padding:30px;">
            <h1 style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:26px; text-align:center; margin:0 0 25px; letter-spacing:1px;">Новая заявка</h1>
            <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:30px; border-collapse:separate; border-spacing:0 15px;">
              <tr>
                <td style="padding:20px; background:#faf5f8; border-radius:8px; border:1px solid #f0e6eb;">
                  <p style="color:#8e6c88; font-weight:600; margin:0 0 12px; font-size:15px;">Комментарий:</p>
                  <div style="background:#fff; padding:15px; border-radius:6px; color:#555; line-height:1.6; font-size:14px; border:1px solid #eee;">
                    ${
                      data.comment
                        ? data.comment.replace(/\n/g, '<br>')
                        : '<span style="color:#aaa;">Нет комментария</span>'
                    }
                  </div>
                </td>
              </tr>
              ${
                data.shipping_address
                  ? `<tr>
                      <td style="padding:20px; background:#faf5f8; border-radius:8px; border:1px solid #f0e6eb;">
                        <p style="color:#8e6c88; font-weight:600; margin:0 0 12px; font-size:15px;">Доставка:</p>
                        <div style="background:#fff; padding:15px; border-radius:6px; color:#555; line-height:1.6; font-size:14px; border:1px solid #eee;">
                          ${data.shipping_address}
                        </div>
                      </td>
                    </tr>`
                  : ''
              }
            </table>
            <h2 style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:18px; text-align:center; margin:0 0 12px; letter-spacing:1px;">Состав заказа</h2>
            <table width="100%" cellspacing="0" cellpadding="0" style="background:#fff; border-radius:8px; border:1px solid #eee; margin-bottom:25px;">
              ${getProductRows(data.products)}
              <tr>
                <td colspan="2" style="padding:10px 20px 10px 20px; border-top:1px solid #eee;">
                  <div style="font-weight:600; color:#8e6c88; font-size:15px;">
                    ${data.taxInfo.price_data.product_data.name}: 
                    <span style="color:#222;">$${centsToDollars(
                      data.taxInfo.price_data.unit_amount
                    )}</span>
                  </div>
                  <div style="font-size:12px; color:#888;">${
                    data.taxInfo.price_data.product_data.description
                  }</div>
                </td>
              </tr>
            </table>
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-top:20px; text-align:center;">
                  <p style="color:#aaa; font-size:12px; margin:0 0 5px;">Дата заявки: ${new Date().toLocaleString(
                    'ru-RU'
                  )}</p>
                  <p style="color:#aaa; font-size:12px; margin:0;">© ${new Date().getFullYear()} Amor Flowers. Все права защищены.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
async function sendOrderMail(data) {
  return transporter.sendMail({
    from: `"${sendEmailConfig.name}" <no-reply@amorflowersfl.com>`,
    to: sendEmailConfig.to.join(','),
    subject: 'Amor Flowers - Новая заявка',
    html: getOrderHtmlBody(data),
  });
}

// --- Для контактной формы (Contact) ---
function getContactHtmlBody(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
      </style>
    </head>
    <body style="margin:0; padding:0; font-family:'Montserrat',Arial,sans-serif; background-color:#f9f6fa;">
      <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; margin:0 auto;">
        <tr>
          <td style="background:#ffffff; padding:30px 0 10px; text-align:center; border-bottom:1px solid #f0e6eb;">
            <div style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:28px; font-weight:600; letter-spacing:1px;">AMOR FLOWERS</div>
          </td>
        </tr>
        <tr>
          <td style="background:url('https://kolesnikovaolha.github.io/Amor-Flowers/img/header-bg.7d7a5d0b.png') center/cover; height:30px;"></td>
        </tr>
        <tr>
          <td style="background:#ffffff; padding:30px;">
            <h1 style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:26px; text-align:center; margin:0 0 25px; letter-spacing:1px;">Новая заявка с контактной формы</h1>
            <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:30px; border-collapse:separate; border-spacing:0 15px;">
              <tr>
                <td style="padding:20px; background:#faf5f8; border-radius:8px; border:1px solid #f0e6eb;">
                  <table width="100%">
                    <tr>
                      <td width="100" style="color:#8e6c88; font-weight:600; padding:8px 0; vertical-align:top;">Имя:</td>
                      <td style="color:#333; padding:8px 0; font-size:15px;">${
                        data.name ||
                        '<span style="color:#aaa;">Не указано</span>'
                      }</td>
                    </tr>
                    <tr>
                      <td style="color:#8e6c88; font-weight:600; padding:8px 0; vertical-align:top;">Телефон:</td>
                      <td style="color:#333; padding:8px 0; font-size:15px;">${
                        data.phone
                          ? `<a href="tel:${data.phone.replace(
                              /[^\d+]/g,
                              ''
                            )}" style="color:#8e6c88; text-decoration:none; font-weight:600;">${
                              data.phone
                            }</a>`
                          : '<span style="color:#aaa;">Не указано</span>'
                      }</td>
                    </tr>
                    <tr>
                      <td style="color:#8e6c88; font-weight:600; padding:8px 0; vertical-align:top;">Email:</td>
                      <td style="color:#333; padding:8px 0; font-size:15px;">${
                        data.email
                          ? `<a href="mailto:${data.email}" style="color:#8e6c88; text-decoration:none;">${data.email}</a>`
                          : '<span style="color:#aaa;">Не указано</span>'
                      }</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:20px; background:#faf5f8; border-radius:8px; border:1px solid #f0e6eb;">
                  <p style="color:#8e6c88; font-weight:600; margin:0 0 12px; font-size:15px;">Комментарий:</p>
                  <div style="background:#fff; padding:15px; border-radius:6px; color:#555; line-height:1.6; font-size:14px; border:1px solid #eee;">
                    ${
                      data.comment
                        ? data.comment.replace(/\n/g, '<br>')
                        : '<span style="color:#aaa;">Нет комментария</span>'
                    }
                  </div>
                </td>
              </tr>
            </table>
            <h2 style="font-family:'Playfair Display',serif; color:#8e6c88; font-size:20px; text-align:center; margin:0 0 20px; letter-spacing:1px;">Детали заявки</h2>
            <table width="100%" cellspacing="0" cellpadding="0" style="background:#faf5f8; border-radius:8px; padding:20px; margin-bottom:25px; border:1px solid #f0e6eb;">
              <tr>
                <td style="padding:8px 0;">
                  <p style="margin:0; color:#8e6c88; font-weight:600; font-size:15px;">Тип букета:</p>
                  <p style="margin:8px 0 0; color:#333; font-size:15px;">${
                    data.bouquetType || 'Не указан'
                  }</p>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <p style="margin:15px 0 0; color:#8e6c88; font-weight:600; font-size:15px;">Дата доставки:</p>
                  <p style="margin:8px 0 0; color:#333; font-size:15px;">${
                    data.deliveryDate || 'Не указана'
                  }</p>
                </td>
              </tr>
            </table>
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding-top:20px; text-align:center;">
                  <p style="color:#aaa; font-size:12px; margin:0 0 5px;">Дата заявки: ${new Date().toLocaleString(
                    'ru-RU'
                  )}</p>
                  <p style="color:#aaa; font-size:12px; margin:0;">© ${new Date().getFullYear()} Amor Flowers. Все права защищены.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

async function sendContactMail(data) {
  return transporter.sendMail({
    from: `"${sendEmailConfig.name}" <no-reply@amorflowersfl.com>`,
    to: sendEmailConfig.to.join(','),
    subject: `Amor Flowers - Новая заявка от ${data.name || 'клиента'}`,
    html: getContactHtmlBody(data),
  });
}

module.exports = { sendOrderMail, sendContactMail };
