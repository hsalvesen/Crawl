### Ever found yourself overwhelmed by the hassle of planning a night out with friends?
![Overwhelmed by planning a night out?](https://advertisingweek.com/wp-content/uploads/2024/08/iStock-1340376853-modified-3cde198f-f91d-473f-9e6d-70e643bff90f-1755x900.jpg)

## Inspiration
Imagine this: It’s Friday night, and you’re ready to unwind after a long week. But as the excitement builds, so does the stress of planning. Where should you go? What’s the best route? How do you coordinate with everyone? The reality is, what should be a fun, carefree night out often turns into a logistical nightmare. This scenario is all too familiar, especially for young adults, who frequently cite the complexity of planning as a major barrier to socialising [[1]](https://www.abc.net.au/news/2023-07-17/social-media-work-hours-cost-of-living-rising-loneliness/102563666).

On the other side, the hospitality industry—particularly pubs and bars—has been struggling post-COVID. **Many establishments are finding it difficult to attract customers** and **regain their pre-pandemic momentum.** With patrons more hesitant to venture out without a clear plan, these local gems are being overlooked.

Crawl was born from the need to streamline social outings, making it easier for people to connect with friends and explore their local area, while also supporting local businesses in their recovery. We believe **socialising should be spontaneous,** **fun,** and **stress-free**—Crawl makes that a reality.

![Enter: Crawl!](https://offloadmedia.feverup.com/secretmelbourne.com/wp-content/uploads/2023/11/13224018/1220by800iStock-1418585919-1024x683.png)

## What it does
Crawl is an app designed to remove the friction of socialising by **generating an optimal pub crawl route based on your current location.** The app intelligently selects a series of pubs to visit, ensuring **minimal walking distance** and **culminating at the nearest train station** for a convenient journey home. Additionally, users can **join ongoing pub crawls in their area,** fostering spontaneous social interactions and making it easy to meet new people.

Our MVP is focused on pubs and bars, but Crawl’s design is inherently extensible. Future updates could expand to include **routes for museums,** **arcades,** **clubs,** and **food spots,** making it a versatile tool for all kinds of social outings.

## How we built it
### Frontend
We built the frontend using React Native and Expo to provide a **smooth, responsive experience across both iOS and Android platforms.** The user interface is **minimalistic and intuitive,** ensuring that the process of planning a night out is as simple as possible.

### Backend
The backend is powered by Python, handling the logic for **routing, API integrations,** and **real-time data management.** Hosting is managed through Vercel, providing **reliable performance** and **security.**

### Custom Algorithm
At the core of Crawl is a **a modified A* algorithm** that generates the most efficient pub crawl route. This algorithm takes into account the user’s current location, nearby pubs, and the distance to the nearest train station. Our algorithm incorporates several specific adjustments:

- **Penalising high ratings from low review counts** to prioritise reliability.
- **Including all nearby pubs and bars** to offer comprehensive options.
- **Normalising the heuristic and cost evaluation functions** to give equal weight to distance and pub ratings.
- **Custom weighting of ratings and distance in the cost heuristic,** with rigorous user and A/B testing to fine-tune these weights.
- **Introducing randomness** to ensure that no two pub crawls are the same.

### APIs:
- **Google Maps API** for real-time location tracking and map rendering.
- **Places API** to identify nearby pubs and bars.
- **Distance Matrix API** to calculate pairwise walking distances, optimising the route.

### Frontend API Calls:
- **React Native Maps** and **React Native Maps Direction** for mapping and navigation.
- **Google Cloud** and **Fetch** for simple and efficient API requests and data handling.

## Challenges we ran into
- **Algorithm Optimisation:** Implementing and fine-tuning our custom search algorithm was a significant challenge. Our initial iterations produced unexpectedly long routes, some taking up to 80 minutes. We had to carefully **adjust the weights in our heuristic** and refine how we ranked Google Maps API returns to achieve better results.
- **API Integration:** Integrating Google APIs with React Native posed its own challenges, particularly when dealing with **API rate limits.** We implemented a **rate limiter** to prevent exceeding API request quotas, especially as we scaled the app for multiple users.
- **UI/UX Design:** We initially faced difficulties in **deploying our custom, stylised map through Expo,** as our original solution wasn’t compatible with React Native. We had to pivot to a different API with **fewer features and styling options,** but one that was compatible and still offered a seamless user experience.

## Accomplishments we're proud of
- **Algorithm Success:** We’re proud of successfully integrating our custom algorithm to generate routes that **optimise distance** while also **align with user preferences and group dynamics.**
- **User-Centric Design:** Our MVP is functional, **user-friendly,** and directly addresses a real need in the social landscape. The minimalistic **UI/UX design removes unnecessary friction,** allowing users to focus on enjoying their night out.
- **Front-End Journey** We are quite proud of the journey we took from not knowing what Expo was at the start of the hackathon to completing a functional Front End

## Technical Achievements: 
Building a **robust backend** capable of handling real-time data and multiple user requests simultaneously, all without significant latency, was a major accomplishment. Overcoming **challenges with Google API integration** and **map stylisation** further showcased our technical abilities.

## What we learned
- **Team Collaboration:** We learned the importance of effective communication and task delegation, ensuring that the frontend and backend development processes were aligned and synchronised.
- **API Management:** Our experience with Google Maps and Places APIs taught us valuable lessons in handling **API rate limits** and **optimising API calls** for efficiency and reliability.
- **User Experience:** Through extensive user testing and feedback, we gained insights into designing an app that **truly meets the needs of our target audience,** ensuring that the experience is **intuitive and enjoyable.**

## What's next for Crawl
- **Expand Offerings:** We plan to extend Crawl’s capabilities beyond pubs and bars to include other social venues such as **museums, arcades, clubs,** and **restaurants,** broadening its appeal and usability.
- **Enhanced Social Features:** We’re looking to add features like **event creation, group invites,** and **real-time notifications for ongoing pub crawls** to further enhance the social experience and make it easier for users to connect with others.
- **Machine Learning Integration:** Future updates will explore the integration of **machine learning to personalise pub crawl recommendations** based on user preferences and past activities, making Crawl even more tailored to individual needs.
 - **Global Expansion:** We’re excited to adapt Crawl for international markets, taking into account **cultural differences** and **local preferences in pub crawling,** ensuring that the app remains relevant and engaging worldwide.

We’re thrilled about Crawl’s potential to transform socialising, making it easier, more fun, and more spontaneous. Whether you’re exploring new places or rediscovering familiar ones, Crawl is here to bring people together, one pub at a time.
___

# Crawl App Frontend

This README provides installation instructions and contribution guidelines for developers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Crawl App, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://classic.yarnpkg.com/) (v1.x or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running and developing React Native apps)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (if using the React Native CLI directly)
- [Android Studio](https://developer.android.com/studio) and/or [Xcode](https://developer.apple.com/xcode/) (for Android/iOS development)

### Installing Dependencies

1. Clone the repository:

    ```bash
    git clone git@github.com:Crawl-App/app-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd crawl
    ```

3. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

4. Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

    This will launch the Expo development server or the React Native bundler, depending on your setup.

5. Open the app on your device or emulator:

    - **For Expo**: Scan the QR code using the Expo Go app (available on Android and iOS).
    - **For React Native CLI**: Run `npm run android` or `npm run ios` to launch the app on an emulator or connected device.


## Contributing

We welcome contributions to Crawl App! To contribute, please follow these guidelines:

1. **Fork the repository**: Click on the "Fork" button on the top right of the project repository page on GitHub.

2. **Clone your fork**:

    ```bash
    git clone git@github.com:Crawl-App/app-frontend.git
    ```

3. **Create a new branch**:

    ```bash
    git checkout -b feature/your-feature
    ```

4. **Make your changes** and commit them:

    ```bash
    git add .
    git commit -m "Add your message describing the changes"
    ```

5. **Push to your fork**:

    ```bash
    git push origin feature/your-feature
    ```

6. **Submit a pull request**: Go to our original repository on GitHub and create a new pull request from your branch.

### Code Style

- Please follow the AirBnb Style Guide
- Use Prettier and ESLint to ensure code quality and consistency.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!

___

# Crawl Backend

To run this app, you will need a Google Maps API key in a .env file, under the variable name `GOOGLE_MAPS_API_KEY`.

To activate the virtual environment for the backend, use:
`source venv/bin/activate`
then run:
`pip install -r requirements.txt`
___

