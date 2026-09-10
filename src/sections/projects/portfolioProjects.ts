import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

const fullStackProjects: PortfolioProject[] = [
    {
        id: 'himati',
        title: 'HIMA TI Official Web Portal',
        label: 'HIMA TI Portal',
        description:
            'Website portal resmi Himpunan Mahasiswa Teknik Informatika (HIMATI) STT Terpadu Nurul Fikri. Menghadirkan profil organisasi, kegiatan PERASA, berita teknologi, serta agenda event kampus dengan antarmuka modern, interaktif, dan performa tinggi.',
        period: 'April 2026 – Sekarang',
        role: 'Lead Web Developer',
        skills: [
            'full-stack',
            'react',
            'tailwind-css',
            'javascript',
            'gsap',
            'git',
            'ui-ux-architecture',
        ],
        domain: 'Organization Portal & Campus Community',
        owner: 'HIMATI STT Terpadu Nurul Fikri',
        constellation: {
            id: 'full-stack',
            position: [0.0, 1.12, 0.05],
            labelOffset: [0.0, 0.28],
            links: ['oscar-3', 'vibeti'],
        },
    },
    {
        id: 'oscar-3',
        title: 'OSCAR 3.0: Explore The Future',
        label: 'OSCAR 3.0',
        description:
            'Platform web kompetisi teknologi nasional "Rainforest of Innovation" Dies Natalis HIMA TI STT NF. Menyediakan sistem registrasi peserta tingkat nasional (mahasiswa & pelajar), unduh booklet lomba, alur roadmap event, dan manajemen kompetisi digital.',
        period: '2026',
        role: 'Full-Stack Web Developer',
        skills: [
            'full-stack',
            'laravel',
            'react',
            'tailwind-css',
            'mysql',
            'clean-code',
        ],
        domain: 'National Technology Competition Platform',
        owner: 'HIMATI STT Terpadu Nurul Fikri',
        constellation: {
            id: 'full-stack',
            position: [-0.98, 0.38, 0.15],
            labelOffset: [-0.35, 0.12],
            links: ['himati', 'uniborrow'],
        },
    },
    {
        id: 'vibeti',
        title: 'VibeTi - Concert Ticket Experience',
        label: 'VibeTi',
        description:
            'Platform booking dan reservasi tiket konser musik interaktif ("Rasakan euforia konser musik dalam genggamanmu"). Fitur meliputi kurasi artis unggulan, jadwal festival real-time, manajemen tiket instan, dan alur transaksi yang responsif dan aman.',
        period: '2026',
        role: 'Full-Stack Developer',
        skills: [
            'full-stack',
            'laravel',
            'react',
            'tailwind-css',
            'mysql',
            'restful-api',
            'ticketing-system',
        ],
        domain: 'Entertainment & E-Ticketing Solution',
        owner: 'Independent Coding Project',
        constellation: {
            id: 'full-stack',
            position: [0.98, 0.38, -0.15],
            labelOffset: [0.35, 0.12],
            links: ['himati', 'laundry-pro'],
        },
    },
    {
        id: 'uniborrow',
        title: 'uniborrow. - Digital Laboratory Inventory',
        label: 'uniborrow.',
        description:
            'Sistem inventaris dan peminjaman peralatan laboratorium digital kampus tanpa registrasi akun untuk mahasiswa. Memfasilitasi peminjaman laptop, smartphone pengujian, keyboard, dan mouse dengan pembaruan kuota ketersediaan real-time serta dashboard admin.',
        period: '2026',
        role: 'Full-Stack Developer',
        skills: [
            'full-stack',
            'laravel',
            'mysql',
            'php',
            'tailwind-css',
            'clean-code',
            'inventory-system',
        ],
        domain: 'Digital Inventory & Campus Asset Management',
        owner: 'Independent Coding Project',
        constellation: {
            id: 'full-stack',
            position: [-0.62, -0.85, 0.1],
            labelOffset: [-0.3, -0.15],
            links: ['oscar-3', 'laundry-pro'],
        },
    },
    {
        id: 'laundry-pro',
        title: 'Laundry Pro - Fast, Clean & Reliable Service',
        label: 'Laundry Pro',
        description:
            'Layanan pemesanan jasa laundry dan dry cleaning on-demand dengan fasilitas free pickup & delivery. Menyediakan katalog paket pencucian, kalkulator estimasi biaya, alur order online cepat, serta pelacakan status cucian yang higienis dan transparan.',
        period: '2026',
        role: 'Full-Stack Developer',
        skills: [
            'full-stack',
            'laravel',
            'react',
            'tailwind-css',
            'mysql',
            'docker',
            'on-demand-service',
        ],
        domain: 'On-Demand Service & Order Management Platform',
        owner: 'Independent Coding Project',
        constellation: {
            id: 'full-stack',
            position: [0.62, -0.85, -0.1],
            labelOffset: [0.3, -0.15],
            links: ['vibeti', 'uniborrow'],
        },
    },
];

const constellationScrollOrder = {
    'full-stack': 0,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    b.constellation.position[1] - a.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [
    ...fullStackProjects,
].sort(compareProjectScrollOrder);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);
