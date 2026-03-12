const frames = [
    {
        template: "title",
        hideViz: true,
        title: "40 acres and a mule",
        subtitle: "A promise to black families left unkempt.",
        attribution: "A data story by Sub, Maddy, Pearl, and Sayuj",
        image: "assets/frame1.png"
    },
    {
        template: "split",
        hideViz: true,
        image: "assets/frame2.png",
        title: "What is the 40 acres and a mule promise?",
        subtitle: "Wartime Order No. 15 was proclaimed by Union general William Sherman in 1865 during the American Civil War, to allot 400,000 acres to 18,000 formerly enslaved families in parcels of at most 40 acres of land. This land was across Georgia, South Carolina, and Florida. The promise was reversed by President Johnson.",
        body: "400,000 acres is 1.3x larger than the city of Los Angeles."
    },
    {
        template: "split",
        hideViz: true,
        title: "The Current Situation",
        image: "assets/present_day.png",
        body: "In 2022, Black families make $0.15 cents for every $1 dollar a White family earns. This is indicative of strong barriers to generational wealth."
    },
    {
        template: "card",
        hideViz: true,
        title: "What if this 40 acre promise was kept to Black families?",
        body: "We will model 18,000 Black families and 18,000 white families in South Carolina over time, tracking their respective wealth trajectories under a “40 acres and a mule” scenario compared to what actually occurred in history. We will simulate an initial land grant of 40 acres to each family and track changes in net worth over time through wealth channels such as income, savings, and investments, as well as economic opportunities including access to loans and exposure to large-scale economic shocks."
    },
    {
        template: "card",
        title: "1865",
        subtitle: "What actually happened",
        body: `
<p><u>Reconstruction policies</u>: Freedmen briefly gained political representation and some economic opportunities, but land redistribution largely failed.</p>

<p><u>Rise of sharecropping</u>: Without land ownership, many Black families entered exploitative sharecropping contracts that trapped them in cycles of debt.</p>
`
    },
    {
        template: "card",
        image: "assets/frame6.png",
        body: "During this time in history: Black wages remain extremely low and unstable. Wealth accumulation is nearly impossible, and the wealth gap solidifies early.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame7.png",
        subtitle: "Our Simulation",
        body: ` <p> In our scenario, land ownership prevents dependence on sharecropping. Early wealth accumulation begins, and the Black wealth line rises.  <\p>
    
    Although Black families are starting off with 40 acres, the average white family at this time started off with much more land. White families were the main beneficiaries of policies such as the Homestead Act of 1862, which granted up to 160 acres of public land to settlers.`,
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame8.png",
        statsYear: 1880,
        body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
        wage: 1
    },
    {
        template: "card",
        title: "1910s-20s",
        body: `
<p><u>Great Migration</u>: Over 6 million Black Americans move from the rural South to the North and West seeking industrial jobs and higher wages.</p>

<p><u>Tulsa Race Massacre and racial violence</u>: The Tulsa Race Massacre was when, in June 1921, mobs of white supremacist terrorists attacked black residents of Tulsa, Oklahoma, and destroyed homes and businesses in the wealthiest black community in the US at the time. This massacre was a direct attack on Black wealth. Our simulation takes into account that black families are more likely to be subject to economic shocks like these than white families. </p>
`
    },
    {
        template: "card",
        image: "assets/frame10.png",
        body: "During this time in our history: Black wages rise modestly due to industrial work, but wealth remains fragile and vulnerable to racial violence. The gap narrows slightly in wages but not in assets.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame11.png",
        body: "In our scenario: Families with inherited land capital have the financial resources to invest in businesses, take out loans, and rebuild more easily after violence. The wealth line rises faster and is less fragile.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame12.png",
        statsYear: 1920,
        body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
        wage: 1
    },
    {
        template: "card",
        title: "1930s-40s",
        body: `
<p><u>Great Depression</u>: The collapse of agricultural prices and massive unemployment hit Black workers especially hard because they were overrepresented in low-wage farm and service jobs and were often the last hired, first fired.</p>
<p><u>New Deal exclusions</u>: Many New Deal programs, including early Social Security and labor protections, excluded agricultural and domestic workers (jobs where Black Americans were overrepresented) limiting their access to unemployment insurance, pensions, and wage protections.</p>
<p><u>Postwar housing boom</u>: After World War II, federally backed mortgages fueled a massive suburban housing boom, becoming the main engine of middle-class wealth in America. However, redlining and discriminatory lending largely shut Black families out of these appreciating neighborhoods, widening the racial wealth gap.</p>
`
    },
    {
        template: "card",
        image: "assets/frame14.png",
        body: "During this time in our history: white wages sharp drop around 1929-1933 and gradual recovery late 1930s. Black wages steeper drop than white wages, slower recovery, gap widens.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame16.png",
        statsYear: 1940,
        body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
        wage: 1
    },
    {
        template: "card",
        title: "1950s-60s",
        body: `
<p><u>Emmett Louis Till</u>: (July 25, 1941 – August 28, 1955) was an African-American boy who, at 14 years old, was abducted and lynched in Mississippi in 1955 after being accused of offending a white woman. His lynching exposed the violent enforcement of white supremacy, reinforcing social and economic terror that restricted mobility, business development, and investment in Black communities.</p>

<p><u>Brown v. Board of Education (1954)</u>:Ruled school segregation unconstitutional, but implementation was slow and heavily resisted in the South, limiting immediate gains in education quality and long-term earnings for Black families.</p>
`
    },
    {
        template: "card",
        image: "assets/frame18.png",
        body: "During this time in our history: white wages steady upwards slope (postwar prosperity, manufacturing boom, suburbanization), black wages slower upward slope, small improvement but still clearly below white wages. Wealth gap widens because housing appreciation compounds white wealth faster than wages alone.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame20.png",
        statsYear: 1960,
        body: `<p class="model-stats-loading">Loading simulation statistics...</p>`,
        wage: 1
    },
    {
        template: "card",
        title: "1970s-80s",
        body: `
<p><u>Manufacturing decline</u>: Factory jobs disappear, especially in urban areas where Black workers were concentrated.</p>

<p><u>Rise of financialization</u>:Economic growth shifts toward finance and services, favoring those with assets rather than wage-only income.</p>
`
    },
    {
        template: "card",
        image: "assets/frame22.png",
        body: "During this time in our history: Black wages decline more sharply due to industrial job loss, and unemployment lasts longer. The wage gap widens and wealth stagnates or declines in many communities.",
        wage: 1
    },
    {
        template: "card",
        image: "assets/frame23.png",
        body: "At this point in time, Black families who received the 40-acre land grant are at the same net worth as Black families who did not receive the grant.",
        wage: 1
    },
    {
        template: "card",
        title: "2000s",
        body: `
<p><u>Subprime lending disparities</u>:Black homeowners are disproportionately targeted with high-risk mortgages.</p>

<p><u>2008 Housing Crash</u>: Massive home equity losses hit Black households harder, erasing significant portions of accumulated wealth.
</p>
`},
    {
        template: "card",
        title: "Present Day (2000 - 2026)",
        body: `Giving every Black family 40 acres of land might have helped bridge some wealth gaps and improve access to economic opportunity initially, but it would not have been enough to eliminate the deeply rooted barriers to success. Large-scale economic shocks, similar to the destruction of Greenwood during the Tulsa race massacre, which devastated what was often called “Black Wall Street,” wiped out generations of accumulated wealth in a matter of days.
`
    },
    {
        template: "card",
        body: `Beyond outright violence, systemic barriers continued to limit economic mobility. Discriminatory practices like redlining restricted where Black families could live and invest, cutting them off from appreciating property values and access to credit. Limited access to traditional banking, exclusion from investment markets, employment discrimination, and unequal educational opportunities further compounded these disadvantages over time.
`
    },

    //after this, hide the chart again to focus on the conclusions

    {
        template: "card",
        hideViz: true,
        body: `Together, these factors illustrate that while land redistribution could have provided an important foundation, if the structural racism embedded in financial, legal, and social systems had remained unchanged, it would have continued to pose significant obstacles to long-term economic equity, even with the initial land grant.
`
    },

    {
        template: "card",
        hideViz: true,
        title: "But what if we removed some of these barriers?"
    },

    {
        template: "card",
        subtitle: " What if systematic theft events such as the Tulsa Race Massacre did not happen to Black families? ",
        body: `Events similar to the Tulsa Race Massacre occurred across the United States and often resulted in the destruction of Black wealth and communities. The Wilmington Massacre of 1898 in North Carolina, the Atlanta Race Massacre of 1906 in Georgia, the Elaine Massacre in Arkansas, and the Rosewood Massacre in Florida involved violent attacks on Black residents that destroyed homes, businesses, and local institutions. These events forced many Black families to flee their communities, leading to the loss of land, property, and long-term economic opportunity.`
    },

    {
        template: "toggle",
        factorKey: "TE",
        title: "What if systematic theft events such as the Tulsa Race Massacre did not happen to Black families?",
        toggleOptionA: "Theft Equality",
        toggleOptionB: "Actual (with theft events)",
    },
    {
        template: "toggle",
        factorKey: "SE",
        title: "How would wealth outcomes change if Black families had the same savings rate as white families and equal inclusion in Social Security?",
        toggleOptionA: "Savings Equality",
        toggleOptionB: "Actual",
    },
    {
        template: "toggle",
        factorKey: "IE",
        title: "What if Black families took home the same amount of income as white families?",
        toggleOptionA: "Income Equality",
        toggleOptionB: "Actual",
    },
    {
        template: "toggle",
        factorKey: "AE",
        title: "What if we remove all three of these barriers?",
        toggleOptionA: "Toggle ALL",
        toggleOptionB: "Keep Barriers",
    },

];
