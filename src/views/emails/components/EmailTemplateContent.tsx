import { useAppStore } from '@/stores/useAppStore';

export default function EmailTemplateContent() {
  const headerTxt = useAppStore((store) => store.header);
  const logo = useAppStore((store) => store.logo);
  const mainImage = useAppStore((store) => store.mainImage);
  const content = useAppStore((store) => store.content);
  const endContent = useAppStore((store) => store.endContent);
  const listCard = useAppStore((store) => store.listCard);
  const footer = useAppStore((store) => store.footer);

  return (
    <>
      <div
        style={{
          backgroundColor: '#fafafa',
          padding: 10,
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            background: headerTxt.backgroundColor,
            height: '2rem',
            display: 'flex',
          }}
        >
          <h1
            style={{
              fontSize: 13,
              fontWeight: 100,
              color: headerTxt.fontColor,
              margin: 'auto',
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              textTransform: 'uppercase',
            }}
          >
            {headerTxt.title}
          </h1>
        </div>
        <div
          style={{ textAlign: 'center', margin: '20px 0', padding: '0 80px' }}
        >
          <img
            src={logo}
            alt='Candlelight Concert'
            style={{ width: '80%', margin: 'auto' }}
          />
        </div>
        <img
          src={mainImage}
          alt='Candlelight Concert'
          style={{ width: '100%' }}
        />
        <div style={{ textAlign: 'center', padding: '20px 0px' }}>
          <p style={{ fontSize: 14, lineHeight: '1.5', textAlign: 'justify' }}>
            {content}
          </p>
          <a
            href={endContent.href}
            target='_blank'
            style={{ fontSize: 14, lineHeight: '1.5', color: '#e67e1f' }}
          >
            {endContent.name}
          </a>
        </div>
      </div>

      {listCard.map((card, index) => (
        <div
          key={index}
          style={{
            padding: '10px 5px',
            maxWidth: 500,
            margin: 'auto',
            background: '#fafafa',
            fontFamily: 'corbel, "sans-serif" !important',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: card.backgroundColor,
              borderRadius: 5,
            }}
          >
            <img
              src={card.image}
              alt='Queen Candlelight'
              style={{
                width: 165,
                height: 165,
                objectFit: 'cover',
                padding: 10,
              }}
            />
            <div
              style={{
                textAlign: 'center',
                padding: '0 5px',
                wordBreak: 'break-all',
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 100,
                  marginBottom: 5,
                  color: card.header.fontColor,
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                }}
              >
                {card.header.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  marginBottom: 15,
                  fontFamily: 'corbel, "sans-serif" !important',
                  textTransform: 'capitalize',
                }}
              >
                {card.content.title}
              </p>
              <a
                href={card.button.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                <button
                  type='button'
                  style={{
                    backgroundColor: card.button.backgroundColor,
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '15rem',
                    cursor: 'pointer',
                    fontSize: 14,
                    marginBottom: 24,
                    fontFamily: 'corbel, "sans-serif" !important',
                  }}
                >
                  {card.button.title}
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          textAlign: 'center',
          padding: '10px 5px',
          maxWidth: 500,
          margin: 'auto',
          background: '#fafafa',
          fontFamily: 'corbel, "sans-serif" !important',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            background: footer.backgroundColor,
            borderRadius: 5,
            padding: '30px 0px',
          }}
        >
          <h2
            style={{
              color: footer.fontColor,
              fontSize: 24,
              marginBottom: 20,
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              fontWeight: 100,
            }}
          >
            {footer.title}
          </h2>
          <div style={{ margin: '20px 0', marginTop: 40 }}>
            {footer.buttons.map(
              (button, index) =>
                button.title && (
                  <a
                    key={index}
                    href={button.href}
                    style={{
                      backgroundColor: button.backgroundColor,
                      color: button.fontColor,
                      padding: '12px 17px',
                      border: 'none',
                      borderRadius: '15rem',
                      fontSize: 14,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      margin: 5,
                      fontFamily: 'corbel, "sans-serif" !important',
                    }}
                  >
                    {button.title}
                  </a>
                )
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#fafafa',
          textAlign: 'center',
          marginTop: 30,
          padding: 10,
          maxWidth: 500,
          margin: 'auto',
          fontFamily: 'corbel, "sans-serif" !important',
        }}
      >
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>IPC MIAMI BEACH</h3>
        {footer.locationButtons.map((button, index) => (
          <a
            key={index}
            style={{ color: button.fontColor, fontSize: 12 }}
            href={button.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {button.title} {index + 1 < footer.locationButtons.length && '|'}{' '}
          </a>
        ))}
        <p style={{ color: '#888', fontSize: 12, marginBottom: 5 }}>
          {footer.location}
        </p>
        <p style={{ color: '#888', fontSize: 10 }}>
          COPYRIGHT 2024 - ALL RIGHTS RESERVED
        </p>
      </div>
    </>
  );
}
