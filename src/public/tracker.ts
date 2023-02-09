interface Tracker {
  track(event: string, ...tags: string[]): void;
}

class AnalyticsTracker implements Tracker {
  protected buffer: Array<object> = [];
  protected trackerUrl = location.protocol + "//localhost:8888/track";

  protected timer: ReturnType<typeof setTimeout>; // setTimeout identifier
  protected timeout: number = 1000;

  constructor() {
    window.addEventListener("beforeunload", () => {
      this.send(true);
    });
  }

  track = (event: string, ...tags: string[]) => {
    console.log(`Tracking event: ${event} with tags: ${tags}`);
    this.buffer.push({
      event: event,
      tags: tags || [],
      url: window.location.href,
      title: document.title,
      ts: Date.now() /* / 1000 */, // several events per second may fire
    });

    if (this.buffer.length > 2) {
      clearTimeout(this.timer);
      this.send();
    } else if (this.timer === undefined) {
      // throttling
      this.timer = setTimeout(this.send, this.timeout);
    }
  };

  send = (unloadPage?: boolean) => {
    if (!this.buffer.length) return;

    this.timer = undefined;

    if (unloadPage) {
      navigator.sendBeacon(this.trackerUrl, JSON.stringify(this.buffer));
      this.buffer = [];
      console.log("Sent!");
    }

    fetch(this.trackerUrl, {
      method: "POST",
      body: JSON.stringify(this.buffer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to send beacon: ${response.statusText}`);
        }
        return response.text();
      })
      .then(() => {
        this.buffer = [];
        console.log("Sent!");
      })
      // Instead of deleting and re-add tracks to the buffer just wait 1 second
      // it helps us save queue instead of buffer, and lately, it may help avoid errors with sorting/ordering
      .catch(() => setTimeout(this.send, 1000));
  };
}

const tracker = new AnalyticsTracker();
