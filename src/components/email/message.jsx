import React from 'react';
import { Email, renderEmail } from 'react-html-email';

export const PostFetch = (url, message) => {
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
};
export const Message = ({
  displayName,
  phone,
  email,
  destination,
  date,
  driver,
}) => {
  return renderEmail(
    <Email title="Join Hitch">
      <div style={{ padding: '15px' }}>
        <table style={{ width: '100%', textAlign: 'center' }}>
          <tr>
            <h2>
              <strong>HITCH</strong>
            </h2>
          </tr>
        </table>
        <br />
        <br />
        <table style={{ padding: '0px 15px' }}>
          <tr>{`Dear ${driver.name}`},</tr>
        </table>
        <br />
        <table style={{ padding: '15px' }}>
          <tr>
            {`${displayName} will be joining you on tour trip to ${destination} on ${date}`}
          </tr>
        </table>
        <table style={{ padding: '15px' }}>
          <tr>
            <span>
              <strong>{`${displayName}'s Contact`}:</strong> <br /> Phone:{' '}
              {phone} <br /> Email: {email}
            </span>
          </tr>
        </table>
      </div>
    </Email>
  );
};
