using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Models;
using CampusBazaar.DSA.DataStructures;
using CampusBazaar.DSA.Algorithms;
using CampusBazaar.DSA.Services;

namespace CampusBazaar.DSA
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("--- Campus Bazaar DSA Module: Day 4, Day 5 & Day 6 Verification ---\n");

            ResourceRepository repo = new ResourceRepository();
            Trie titleTrie = new Trie();
            ResourceDiscoveryService discovery = new ResourceDiscoveryService(repo, titleTrie);

            ResourceItem note1 = new ResourceItem(101, "Data Structures Final Notes", "Comprehensive summary of trees and graphs.", "CS-201", "PDF", "Ali Khan")
            {
                DownloadCount = 15
            };
            ResourceItem note2 = new ResourceItem(102, "Database Systems Lab Manual", "SQL queries and normalization tasks.", "CS-302", "PDF", "Amna Haseeb")
            {
                DownloadCount = 42
            };
            ResourceItem note3 = new ResourceItem(103, "Calculus Formula Sheet", "Derivatives, integrals, and formulas.", "MTH-101", "TXT", "Sara Ahmed")
            {
                DownloadCount = 8
            };

            ResourceItem[] initialResources = { note1, note2, note3 };

            foreach (var item in initialResources)
            {
                discovery.AddResource(item);
            }

            // --- Day 4: Prefix Search via Service ---
            Console.WriteLine("\n--- Day 4: Prefix Search ('dat') ---");
            foreach (var item in discovery.SearchByTitlePrefix("dat"))
            {
                Console.WriteLine($"  -> {item}");
            }

            // --- Day 5: Sorting & Filtering ---
            Console.WriteLine("\n--- Day 5: Sorted by Downloads (High to Low) ---");
            foreach (var item in ResourceSorter.SortByDownloadsDescending(initialResources))
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\n--- Day 5: Filtered by FileType 'PDF' ---");
            foreach (var item in ResourceSorter.FilterByFileType(initialResources, "PDF"))
            {
                Console.WriteLine($"  -> {item}");
            }

            // --- Day 6: Top-K Trending & Filter+Sort ---
            Console.WriteLine("\n--- Day 6: Top 2 Most Downloaded Resources ---");
            foreach (var item in discovery.GetTopDownloaded(initialResources, 2))
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\n--- Day 6: PDF Resources Sorted by Downloads (High to Low) ---");
            foreach (var item in discovery.FilterAndSortByDownloads(initialResources, fileType: "PDF"))
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\nDay 6 verification complete! Press any key to exit.");
            Console.ReadKey();
        }
    }
}