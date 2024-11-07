const originalError = console.error;

export const errorsIgnore = () => {
    console.error = function (message, ...args) {
        if (message.includes("findDOMNode is deprecated")) {
          return; // Skip logging this specific warning
        }
        originalError.apply(console, [message, ...args]);
      };  
}