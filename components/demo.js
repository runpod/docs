export function Demo() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <section
          style={{
            background: "white",
            borderRadius: 6,
            width: 400,
            height: 112,
            display: "flex",
            flexFlow: "column"
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              style={{
                borderRadius: 4,
                margin: 10,
                width: 56,
                height: 56
              }}
              src="https://b.stripecdn.com/docs-statics-srv/assets/e9d184fcb37d32f21df2171a070f5fbc.png"
              alt="The cover of Stubborn Attachments"
            />
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center"
              }}
            >
              <h3
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#242d60",
                  margin: 0,
                  paddingTop: 0,
                  letterSpacing: "-0.154px"
                }}
              >
                Stubborn Attachments
              </h3>
              <h5 style={{ opacity: 0.5, margin: 0 }}>$20.00</h5>
            </div>
          </div>
          <button
            type="button"
            style={{
              height: 36,
              background: "#556cd6",
              borderRadius: "0 0 4px 4px",
              color: "white",
              border: 0,
              fontWeight: "600",
              boxShadow: "0px 4px 5.5px 0px rgb(0 0 0 / 7%)"
            }}
          >
            Checkout
          </button>
        </section>
      </div>
    )
  }